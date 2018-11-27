import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import uuid from 'uuid/v4';

/**
 * `RewardModal` 组件 让用户选择打赏金额
 */
export default class RewardModal extends Modal {
    init(){
        super.init();
        this.rewardNum = 0;
        this.uuid = uuid();
        this.mixin_user_id = this.props.mixin_user_id
        //console.log(this)
    }
    className() {
        return 'RewardModal Modal--small';
    }
    title() {
        // return app.translator.trans('core.forum.change_password.title');
        return '赞赏Mixin金额';
    }
    content() {
        return (
            <div className="Modal-body">
                <div className="Form Form--centered">
                    <div className="RewardNumButtonGroup">
                        {Button.component({
                            className: 'Button RewardNumButton',
                            type: 'button',
                            children: '0.001',
                            onclick: this.setRewardNum.bind(this)
                        })}
                        {Button.component({
                            className: 'Button RewardNumButton',
                            type: 'button',
                            children: '0.01',
                            onclick: this.setRewardNum.bind(this)
                        })}
                        {Button.component({
                            className: 'Button',
                            type: 'button',
                            children: '0.1',
                            onclick: this.setRewardNum.bind(this)
                        })}
                    </div>
                    <p className="helpText "></p>
                    <div className="Form-group">
                        {Button.component({
                            className: 'Button Button--primary Button--block',
                            type: 'submit',
                            loading: this.loading,
                            children: '确定打赏'
                        })}
                    </div>
                </div>
            </div>
        );
    }
    setRewardNum(e) {
	    console.log(this);
        this.rewardNum = e.target.innerText;
        console.log(this.rewardNum);
    }
    onsubmit(){
        let url = "https://mixin.one/pay?recipient="+this.mixin_user_id+"&asset=c94ac88f-4671-3976-b60a-09064f1811e8&amount="+this.rewardNum+"&trace="+this.uuid+"&memo="
        window.location.href = url;
        console.log(url)
        //console.log(this.uuid)
        return false;
        console.log('onsubmit', this.rewardNum);
    }
}