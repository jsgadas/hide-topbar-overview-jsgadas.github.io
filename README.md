# Hide Top Bar in Overview

---

## Overview

This GNOME Shell extension hides the top bar when you open the Overview and restores it when you exit back to the desktop.

## Features

- Fades out the top bar when entering Overview mode.  
- Restores and fades in the top bar when leaving Overview mode.  

## Installation

1. **Clone the repository** into your GNOME extensions directory:
   ```bash
   git clone https://github.com/yourname/hide-topbar-overview.git      ~/.local/share/gnome-shell/extensions/hide-topbar-overview@jsgadas.github.io
   ```

2. **Ensure** the folder name matches the UUID in `metadata.json`:
   ```text
   ~/.local/share/gnome-shell/extensions/
   └── hide-topbar-overview@jsgadas.github.io/
       ├── extension.js
       └── metadata.json
   ```

3. **Restart GNOME Shell**:
   - On X11: Press <kbd>Alt</kbd>+<kbd>F2</kbd>, type `r`, and press <kbd>Enter</kbd>.  
   - On Wayland: Log out and log back in.

4. **Enable** the extension via the Extensions app or CLI:
   ```bash
   gnome-extensions enable hide-topbar-overview@jsgadas.github.io
   ```

## Usage

- Press the **Super** key or click the **Activities** corner to enter Overview. The top bar will smoothly fade out and become non-interactive.  
- Exit Overview by pressing **Esc** or clicking on the desktop; the top bar will fade back in with its original clickability preserved.

No additional configuration is required.
 
## License

This extension is licensed under the MIT License. See [LICENSE](LICENSE) for details.  
