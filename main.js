const {
    app,
    BrowserWindow,
    Menu,
    globalShortcut,
    session,
    shell,
    clipboard,
    dialog
} = require("electron");

const fs = require("fs");
const path = require("path");

let windows = [];

const VIEWER_URL = "https://structure-viewer.ewanhowell.com/";

let lastEscapePress = 0;



function toggleImmersiveMode(win) {

    if (!win)
        return;


    const enabled =
        !win.isFullScreen();


    win.setFullScreen(enabled);

    win.setMenuBarVisibility(!enabled);

}





function exitImmersiveMode(win) {

    if (!win)
        return;


    if (win.isFullScreen()) {

        win.setFullScreen(false);

        win.setMenuBarVisibility(true);

    }

}





function enablePopoutMode(win) {

    win.webContents.on("did-finish-load", () => {


        win.webContents.executeJavaScript(`

            let sidebarVisible = false;


            const sidebar =
            document.querySelector("aside");


            if(sidebar){

                sidebar.style.display = "none";

            }



            document.addEventListener(
                "keydown",
                (event)=>{

                    if(event.key === "F1"){

                        event.preventDefault();


                        const sidebar =
                        document.querySelector("aside");


                        if(sidebar){

                            sidebarVisible =
                            !sidebarVisible;


                            sidebar.style.display =
                            sidebarVisible
                            ? "flex"
                            : "none";

                        }

                    }

                }

            );

        `);



        // Popout drag bar + close button

        win.webContents.executeJavaScript(`


        if(!document.getElementById("electronDragBar")){


            const bar =
            document.createElement("div");


            bar.id =
            "electronDragBar";


            bar.style.position =
            "fixed";


            bar.style.top =
            "0";


            bar.style.left =
            "0";


            bar.style.width =
            "100%";


            bar.style.height =
            "28px";


            bar.style.zIndex =
            "999999";


            bar.style.webkitAppRegion =
            "drag";


            bar.style.background =
            "rgba(0,0,0,0.15)";




            const close =
            document.createElement("button");


            close.innerText =
            "×";


            close.style.position =
            "absolute";


            close.style.right =
            "6px";


            close.style.top =
            "3px";


            close.style.width =
            "22px";


            close.style.height =
            "22px";


            close.style.border =
            "none";


            close.style.background =
            "rgba(255,255,255,0.15)";


            close.style.color =
            "white";


            close.style.cursor =
            "pointer";


            close.style.webkitAppRegion =
            "no-drag";


            close.onclick =
            ()=>window.close();



            bar.appendChild(close);


            document.body.appendChild(bar);


        }


        `);

    });

}





function createWindow(options = {}) {


    const win =
    new BrowserWindow({

        width:
            options.width || 1200,

        height:
            options.height || 800,


        title:
            "Structure Viewer",


        alwaysOnTop:
            options.alwaysOnTop || false,


        frame:
            options.frame !== false,


        webPreferences: {

            sandbox:false

        }

    });



    win.loadURL(VIEWER_URL);



    win.webContents.setWindowOpenHandler(
        ({url})=>{

            shell.openExternal(url);

            return {
                action:"deny"
            };

        }
    );



    win.webContents.on(
        "will-navigate",
        (event,url)=>{

            if(!url.startsWith(VIEWER_URL)){

                event.preventDefault();

                shell.openExternal(url);

            }

        }
    );



    if(options.popout){

        enablePopoutMode(win);

    }



    // Double ESC exits immersive mode

    win.webContents.on(
        "before-input-event",
        (event,input)=>{


            if(
                input.type === "keyDown" &&
                input.key === "Escape"
            ){

                const now =
                Date.now();



                if(now - lastEscapePress < 500){

                    exitImmersiveMode(win);

                    lastEscapePress = 0;

                }
                else{

                    lastEscapePress = now;

                }

            }


        }
    );



    windows.push(win);



    win.on(
        "closed",
        ()=>{

            windows =
            windows.filter(
                w=>w!==win
            );

        }
    );


    return win;

}





async function takeScreenshot(){

    const win =
    BrowserWindow.getFocusedWindow();


    if(!win)
        return;


    const image =
    await win.webContents.capturePage();



    const folder =
    path.join(
        app.getPath("pictures"),
        "StructureViewer Screenshots"
    );


    fs.mkdirSync(
        folder,
        {
            recursive:true
        }
    );


    const file =
    path.join(
        folder,
        `screenshot-${Date.now()}.png`
    );


    fs.writeFileSync(
        file,
        image.toPNG()
    );


    dialog.showMessageBox({
        title:"Screenshot Saved",
        message:file
    });

}





async function copyScreenshot(){

    const win =
    BrowserWindow.getFocusedWindow();


    if(!win)
        return;


    const image =
    await win.webContents.capturePage();


    clipboard.writeImage(image);

}







function createMenu(){


const template = [


{
label:"File",

submenu:[


{
label:"New Window",

accelerator:"Ctrl+N",

click(){

createWindow();

}

},


{
type:"separator"
},


{
role:"quit"
}


]

},




{
label:"Window",

submenu:[


{
role:"minimize"
},


{
label:"Maximize",

click(){

const win =
BrowserWindow.getFocusedWindow();

if(win)
win.maximize();

}

},


{
label:"Fullscreen",

accelerator:"F11",

click(){

toggleImmersiveMode(
BrowserWindow.getFocusedWindow()
);

}

},



{
label:"Always On Top",

type:"checkbox",

click(item){

const win =
BrowserWindow.getFocusedWindow();


if(win)
win.setAlwaysOnTop(
item.checked
);

}

}


]

},





{
label:"View",

submenu:[


{
label:"Popout View",

click(){

createWindow({

width:700,

height:700,

frame:false,

alwaysOnTop:true,

popout:true

});

}

},


{
label:"Immersive Mode",

click(){

toggleImmersiveMode(
BrowserWindow.getFocusedWindow()
);

}

},


{
label:"Zoom In",

accelerator:"Ctrl++",

click(){

BrowserWindow
.getFocusedWindow()
.webContents
.zoomFactor += .1;

}

},


{
label:"Zoom Out",

accelerator:"Ctrl+-",

click(){

BrowserWindow
.getFocusedWindow()
.webContents
.zoomFactor -= .1;

}

},


{
label:"Reset Zoom",

accelerator:"Ctrl+0",

click(){

BrowserWindow
.getFocusedWindow()
.webContents
.zoomFactor = 1;

}

}


]

},





{
label:"Tools",

submenu:[


{
label:"Reload",

accelerator:"Ctrl+R",

click(){

BrowserWindow
.getFocusedWindow()
.reload();

}

},


{
label:"Hard Reload",

click(){

BrowserWindow
.getFocusedWindow()
.webContents
.reloadIgnoringCache();

}

},


{
label:"Clear Cache",

click(){

session.defaultSession.clearCache();

}

},


{
label:"Screenshot",

click(){

takeScreenshot();

}

},


{
label:"Copy Screenshot",

click(){

copyScreenshot();

}

},


{
label:"Toggle DevTools",

click(){

BrowserWindow
.getFocusedWindow()
.webContents
.toggleDevTools();

}

}


]

}


];


Menu.setApplicationMenu(
Menu.buildFromTemplate(template)
);

}







app.whenReady().then(()=>{


createWindow();


createMenu();



globalShortcut.register(
"Ctrl+N",
()=>{

createWindow();

});



globalShortcut.register(
"F10",
()=>{

const win =
BrowserWindow.getFocusedWindow();


if(win)
win.setAlwaysOnTop(
!win.isAlwaysOnTop()
);

});



globalShortcut.register(
"F11",
()=>{

toggleImmersiveMode(
BrowserWindow.getFocusedWindow()
);

});


});






app.on(
"window-all-closed",
()=>{

if(process.platform !== "darwin")
app.quit();

});