An independent, local-first design editor prototype inspired by common visual design workflows. It uses synthetic sample data and does not use Figma branding beyond the challenge's system reference, proprietary source code, private APIs, or real account data.

## 1. Project overview

Mini Figma demonstrates the main user-facing workflows identified for Phase 5: creating and organizing design files, editing visual objects on a canvas, grouping reusable component behavior, connecting screens in a prototype, and simulating collaboration. The prototype is deliberately compact so its data model and interactions can be inspected and explained.

## 2. Rebuild objective

Reconstruct recognizable design-editor workflows in an independent web application. The aim is a functional, understandable demonstration rather than feature parity or pixel-perfect reproduction of any commercial design system.

## 3. Features implemented

- **Design files:** dashboard, sample designs, new file creation, inline rename, prompted rename/delete, delete confirmation, modified date, browser persistence.
- **Canvas and layers:** rectangle, ellipse, and text creation; select, move and resize using the canvas handle; editable position, dimensions, fill, frame background, text, and layer names; delete layers; synchronized layer selection and canvas selection; zoom controls.
- **Editor navigation:** page/screen and layer names can be changed by double-clicking; the Design/Prototype tabs jump to the matching settings; the Personal space menu links back to the design dashboard or starts a new design.
- **Components:** convert a selected object to a main component and create a linked instance. Main component fill and dimensions flow to instances that have not overridden those properties. Instance width, height, fill, and position edits are local overrides. Instances can be duplicated or detached.
- **Prototyping:** add screens, select an object, assign an On Click destination, and navigate between frames in Present mode. Exit preview from the banner or toolbar.
- **Collaboration simulation:** add synthetic invitees with view/edit roles, set link access, copy a local design URL, add comments, and delete comments authored by “You.” The share dialog explicitly describes these as local simulations.

## 4. Technology stack

React 18, TypeScript, Vite, lucide-react icons, CSS, and localStorage. Canvas objects are rendered as SVG so they can be scaled with the frame and manipulated without adding a canvas framework.

## 5. System architecture

```text
src/
  main.tsx          React entry point
  model.ts          File/frame/object types, sample data, localStorage helpers
  style.css         Dashboard, editor, and dialog styles
  ui/
    App.tsx         Dashboard, editor state, panels, sharing/comments flows
    Canvas.tsx      SVG renderer and pointer interactions
```

The application keeps a list of `DesignFile` records in the root component. Actions update the matching file immutably and refresh its modified timestamp. `Canvas` receives the active frame and callbacks, and does not own design data. The properties panel and layer list operate on the same selected object ID.

## 6. Component descriptions

- **Dashboard (`App`):** lists recent files and creates, opens, renames, and deletes files.
- **Canvas (`Canvas`):** renders frame backgrounds and shapes; handles tool clicks, object selection, pointer movement, resizing, text editing, and prototype clicks.
- **Layers panel:** lists objects in the active frame, selects them, indicates components, and deletes layers.
- **Properties panel:** edits object name, position, dimensions, fill, text, component settings, and destination interaction; when nothing is selected it edits frame dimensions and background.
- **Sharing and comments dialog:** edits local permission data and design comments.
- **Present mode:** turns prototype-linked objects into navigation controls.

These are focused components in a small prototype; dashboard and dialogs currently share the application shell rather than separate route bundles.

## 7. Data models

- `DesignFile`: id, name, modified timestamp, frames, active frame ID, component definitions, comments, and simulated permissions.
- `Frame`: id, name, width, height, background color, and an ordered object list.
- `Shape`: id, name, type (`rect`, `ellipse`, or `text`), x/y, width/height, fill, optional text/font size, component link/overrides, and optional prototype destination.
- `Comment`: id, author, text, and creation timestamp.
- `permissions`: synthetic people with `view`/`edit` roles and a `restricted`/`view`/`edit` link setting.

Component definitions store shared fill and dimensions. The instance's `overrides` array records which fields should stop following the main component.

## 8. Synthetic data and architectural assumptions

The first launch seeds two sample files. One contains a small landing-page composition with synthetic shapes and copy; the other is a starter screen. The collaboration identity is the synthetic author “You.” Invitee email addresses are stored only as local example data. There is no authentication, server, network collaboration, or real access control. A copied link is a URL containing the local file ID; this prototype does not synchronize the design to other devices or grant access to another person.

The canvas uses one coordinate system per frame and uniform zoom. Frame links model direct click-to-navigate transitions. Component sharing is limited to fill, width, and height, while other instance properties can remain local.

