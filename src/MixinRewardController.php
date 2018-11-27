<?php

/*
 * This file is part of Flarum.
 *
 * (c) Toby Zerner <toby.zerner@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Xiudongy\Reward\Mixin;

use Exception;
use Flarum\Forum\Auth\Registration;
use Flarum\Forum\Auth\ResponseFactory;
use Flarum\Settings\SettingsRepositoryInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface;
use Zend\Diactoros\Response\RedirectResponse;
use Zamseam\Mixin\MixinClient;
use Flarum\User\User;
use Zend\Diactoros\Response\JsonResponse;


class MixinRewardController implements RequestHandlerInterface
{
    /**
     * @var ResponseFactory
     */
    protected $response;

    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * @param ResponseFactory $response
     */
    public function __construct(ResponseFactory $response, SettingsRepositoryInterface $settings)
    {
        $this->response = $response;
        $this->settings = $settings;
    }

    /**
     * @param Request $request
     * @return ResponseInterface
     * @throws Exception
     */
    public function handle(Request $request): ResponseInterface
    {
        $post_user_id = (int) $_GET['user_id'];
        $user = User::where('id', $post_user_id)->first();
        $data = ['err' => 1];
        if($user->mixin_info) {
            $mixin_info = (array) json_decode($user->mixin_info);
            $data = [
                'err' => 0,
                'mixin_user_id' => $mixin_info['user_id']
            ];
        }
        return new JsonResponse($data);
        /*
        $actor = $request->getAttribute('actor');
        if(!$actor) {
            header("Location: /auth/mixin");
            exit;
        };
        */
    }
}
