/* hide-topbar-overview@jsgadas.github.io — GNOME 45-48 */

import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import GLib from 'gi://GLib';
import Clutter from 'gi://Clutter';

export default class HideTopbarOverview extends Extension {
  enable() {
    this._enabled = true;
    this._showId = Main.overview.connect('showing', this._onOverviewShowing.bind(this));
    this._hideId = Main.overview.connect('hidden', this._onOverviewHidden.bind(this));
    this._reactiveMap = new Map();
    this._panelAnimation = null;
    this._originalPanelOpacity = Main.panel?.actor.opacity ?? 255;
  }

  disable() {
    if (!this._enabled) return;
    this._enabled = false;

    if (Main.overview) {
      Main.overview.disconnect(this._showId);
      Main.overview.disconnect(this._hideId);
    }

    if (this._panelAnimation) {
      this._panelAnimation.stop();
      this._panelAnimation = null;
    }

    if (Main.panel) {
      Main.panel.actor.set_opacity(this._originalPanelOpacity);
      this._restoreReactive(Main.panel.actor);
    }

    this._reactiveMap = null;
  }

  _onOverviewShowing() {
    if (!Main.panel) return;

    // Disable clicks on panel and all its children
    this._saveAndSetReactive(Main.panel.actor, false);

    // Fade-out panel
    this._panelAnimation = Main.panel.actor.ease({
      opacity: 0,
      duration: 200,
      mode: Clutter.AnimationMode.EASE_OUT_QUAD,
      onComplete: () => { this._panelAnimation = null; }
    });
  }

  _onOverviewHidden() {
    if (!Main.panel) return;

    // Restore clicks
    this._restoreReactive(Main.panel.actor);

    // Fade-in panel
    this._panelAnimation = Main.panel.actor.ease({
      opacity: 255,
      duration: 200,
      mode: Clutter.AnimationMode.EASE_OUT_QUAD,
      onComplete: () => { this._panelAnimation = null; }
    });
  }

  _saveAndSetReactive(actor, value) {
    if (!actor) return;
    if (!this._reactiveMap.has(actor))
      this._reactiveMap.set(actor, actor.reactive);
    actor.reactive = value;
    if (actor.get_children) {
      actor.get_children().forEach(child => this._saveAndSetReactive(child, value));
    }
  }

  _restoreReactive(actor) {
    if (!actor || !this._reactiveMap) return;
    if (this._reactiveMap.has(actor)) {
      actor.reactive = this._reactiveMap.get(actor);
      this._reactiveMap.delete(actor);
    }
    if (actor.get_children) {
      actor.get_children().forEach(child => this._restoreReactive(child));
    }
  }
}
