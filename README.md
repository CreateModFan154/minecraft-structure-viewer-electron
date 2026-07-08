# Structure Viewer Wrapper

An unofficial Electron desktop wrapper for **Minecraft Structure Viewer** that adds desktop-focused features such as popout windows, fullscreen viewing, and quality-of-life controls.

## Features

### Window Features

* Multiple viewer windows
* Popout viewer mode
* Always-on-top windows
* Minimize and maximize controls
* Immersive fullscreen mode
* Frameless floating viewer windows

### Viewer Improvements

* Hide sidebar in popout mode
* Press **F1** to toggle the sidebar while in popout mode
* Multiple structure viewers can be opened at once
* Dedicated floating window experience for comparing builds

### Controls

| Shortcut      | Action                        |
| ------------- | ----------------------------- |
| `Ctrl + N`    | Open a new viewer window      |
| `F10`         | Toggle always-on-top          |
| `F11`         | Toggle immersive mode         |
| `Esc` + `Esc` | Exit immersive mode           |
| `F1`          | Toggle sidebar in popout mode |
| `Ctrl + R`    | Reload viewer                 |

### Tools

* Reload
* Hard reload
* Clear cache
* Screenshot capture
* Copy screenshot to clipboard
* Developer tools toggle
* External links open in the default browser

## Installation

### Installer

Download the latest installer release and run:

```
Structure Viewer Wrapper Setup.exe
```

Follow the installation steps.

### Portable Version

A portable build may also be provided:

```
Structure Viewer Wrapper.exe
```

No installation required.

## Requirements

* Windows 10 or newer
* Internet connection
* A supported Chromium/Electron environment

## About

Structure Viewer Wrapper is designed to make Minecraft structure viewing easier by providing a dedicated desktop application rather than requiring a normal browser window.

This project does **not** modify the original Structure Viewer website. It only adds wrapper-side features through Electron.

## Privacy

This application currently does not collect analytics or telemetry.

No data is collected, including:

* IP addresses
* Usernames
* Minecraft accounts
* Structure files
* Personal information

If anonymous analytics are added in the future, they will be optional and documented in the Privacy section of the application.

## License

This project is licensed under the **GNU Lesser General Public License v3.0 (LGPL-3.0)**.

The Electron wrapper source code is licensed under LGPL-3.0.

The original Structure Viewer website, code, assets, and branding remain the property of their respective owners. All Rights Reserved.

## Disclaimer

Structure Viewer Wrapper is an unofficial community project and is not affiliated with the original Structure Viewer developers unless explicitly stated.

This project does not modify or use any code from the original project; it simply wraps around the official web version.

Minecraft is a trademark of Mojang Studios. This project is not affiliated with Mojang Studios.

## Contributing

Contributions, bug reports, and suggestions are welcome.

Before contributing:

* Check existing issues
* Keep changes focused
* Respect the LGPL license requirements

## Credits

Created by:

* CreateModFan154

Original MSV creator:

* Ewan Howell

Built with:

* Electron
* JavaScript
* Chromium
* Node.js
