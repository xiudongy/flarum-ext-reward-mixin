import app from 'flarum/app';

import MixinSettingsModal from './components/MixinSettingsModal';

app.initializers.add('flarum-reward-mixin', () => {
  app.extensionSettings['flarum-reward-mixin'] = () => app.modal.show(new MixinSettingsModal());
});
