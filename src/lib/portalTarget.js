/**
 * Where overlays should mount: inside the element in browser fullscreen (e.g. the org chart),
 * since only its descendants are visible then; otherwise <body>.
 */
export const portalTarget = () => document.fullscreenElement || document.body;
