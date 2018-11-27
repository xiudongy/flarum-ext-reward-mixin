import app from 'flarum/app';
import { extend } from 'flarum/extend';
import CommentPost from 'flarum/components/CommentPost';
import Discussion from 'flarum/models/Discussion';
import Badge from 'flarum/components/Badge';
import Button from 'flarum/components/Button';
import User from 'flarum/models/User';
import DiscussionPage from 'flarum/components/DiscussionPage';
import DiscussionControls from 'flarum/utils/DiscussionControls';
import RewardModal from './components/RewardModal';


app.initializers.add('flarum-reward-mixin', () => {
  /*
  extend(Discussion.prototype, 'badges', function(badges) {
    let badge;

    badge = Badge.component({
        label: '打赏',
        icon: 'cny',
    });

    if (badge) {
        badges.add('reward', badge);
    }
  });
  */
  //extend(DiscussionPage.prototype, 'sidebarItems', function(items) {
  extend(CommentPost.prototype, 'actionItems', function(items) {
    if (app.session.user) {
        const discussion = this.discussion;
        const post = this.props.post;
        //console.log(this.props.post.data.relationships.user.data.id)
        items.add('reward', Button.component({
            icon: 'cny',
            title: 'Reward by Mixin',
            children: 'Reward by Mixin',
            className: 'Button Button--danger',
            onclick: function onclick() {
              const post_user_id = post.data.relationships.user.data.id;
              m.request({
                method: "GET",
                url: "/reward/mixin?user_id=:id",
                data: {id: post_user_id}
              })
              .then(function(result) {
                if(result.err == 0) {
                  const mixin_user_id = result.mixin_user_id
                  return app.modal.show(new RewardModal({mixin_user_id}));
                }
                console.log(result)
              })
              //console.log(post_user_id)
                //window.location = "/reward/mixin?post_id=" + post.data.id
            }
        }));
    }
});
});
