// ==UserScript==
// @name         Tailscale 网站翻译器 (Fixed)
// @namespace    http://tampermonkey.net/
// @version      1.2.1
// @description  修复 Tailscale 管理后台汉化：适配新版页面、动态内容与中英文切换
// @author       @RoscoeOwO; gxdung/tailscale-cn contributors
// @match        https://tailscale.com/*
// @match        https://*.tailscale.com/*
// @grant        none
// @run-at       document-idle
// @homepageURL  https://github.com/gxdung/tailscale-cn
// ==/UserScript==

(function () {
  'use strict';

  const translations = [
    {
      dom: '<p>Manage your tailnet account settings.</p>',
      trans: { cn: '管理您的 Tailnet 网络设置。' },
    },
    {
      dom: '<h3 class="text-xl font-semibold tracking-tight" id="unique-ids">Unique IDs </h3>',
      trans: { cn: '唯一标识符' },
    },
    {
      dom: '<p class="text-text-muted mr-7">A unique ID to identify this tailnet in API calls.</p>',
      trans: { cn: '在 API 调用中标识此网络的唯一标识符。' },
    },
    {
      dom: '<div class="inline-flex items-center align-middle justify-center font-medium text-sm border border-gray-200 dark:border-transparent bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-full px-2 py-1 leading-none ml-2"><svg xmlns="http://www.w3.org/2000/svg" width="0.9em" height="0.9em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dollar-sign mr-1" aria-hidden="true"><line x1="12" x2="12" y1="2" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>Paid add-on</div>',
      trans: { cn: '付费功能' },
    },
    {
      dom: '<span class="max-w-full">Delete tailnet…</span>',
      trans: { cn: '删除网络' },
    },
    {
      dom: '<a href="/admin/settings/general/mullvad" class="button bg-gray-0 dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 hover:border-gray-300 dark:hover:border-gray-500 focus-visible:bg-gray-100 dark:focus-visible:bg-gray-600 focus-visible:border-gray-300 dark:focus-visible:border-gray-500 hover:text-gray-900 dark:hover:text-gray-300 disabled:border-gray-200 dark:disabled:border-gray-600/30 disabled:text-text-disabled h-9 px-3">Configure</a>',
      trans: { cn: '配置' },
    },
    {
      dom: '<a class="button bg-gray-0 dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 hover:border-gray-300 dark:hover:border-gray-500 focus-visible:bg-gray-100 dark:focus-visible:bg-gray-600 focus-visible:border-gray-300 dark:focus-visible:border-gray-500 hover:text-gray-900 dark:hover:text-gray-300 disabled:border-gray-200 dark:disabled:border-gray-600/30 disabled:text-text-disabled h-9 px-3">Manage</a>',
      trans: { cn: '管理' },
    },
    {
      dom: '<h3 class="text-xl font-semibold tracking-tight" id="display">Display </h3>',
      trans: { cn: '网络名称设置' },
    },
    {
      dom: '<h3 class="text-xl font-semibold tracking-tight" id="delete-tailnet">Delete tailnet </h3>',
      trans: { cn: '删除 Tailnet 网络' },
    },
    {
      dom: '<p class="mt-1">Permanently delete this tailnet. This action cannot be undone. <a href="https://tailscale.com/kb/1237/delete-tailnet/" target="_blank" rel="noopener noreferrer" class="link whitespace-nowrap" aria-label="Read documentation about Delete tailnet">Learn more</a></p>',
      trans: { cn: ['永久删除此 Tailnet 网络。此操作无法撤销。{a}', '了解更多'] },
    },
    {
      dom: '<p class="mt-1">Set a display name to easily recognize this tailnet. </p>',
      trans: { cn: '设置一个名称，以便轻松识别此 Tailnet 网络。' },
    },
    {
      dom: '<h3 class="text-xl font-semibold tracking-tight" id="send-files">Send Files</h3>',
      trans: { cn: '发送文件' },
    },
    {
      dom: '<h2 class="text-2xl font-semibold tracking-tight" id="feature-previews">Feature previews</h2>',
      trans: { cn: '功能预览' },
    },
    {
      dom: '<h3 class="text-xl font-semibold tracking-tight" id="services-collection">Services Collection</h3>',
      trans: { cn: '服务信息收集' },
    },
    {
      dom: '<h3 class="text-xl font-semibold tracking-tight" id="redesigned-macos-client-ui">Redesigned MacOS Client UI</h3>',
      trans: { cn: '重构版 MacOS 客户端界面' },
    },
    {
      dom: '<h3 class="text-xl font-semibold tracking-tight" id="tailnet-lock">Tailnet Lock</h3>',
      trans: { cn: 'Tailnet 锁定功能' },
    },
    {
      dom: '<p class="max-w-lg text-text-muted mb-4 md:mb-0">Allow users on your network to route traffic from the wider internet to their Tailscale nodes. <a href="https://tailscale.com/kb/1223/tailscale-funnel" target="_blank" rel="noopener noreferrer" class="link whitespace-nowrap" aria-label="Read documentation about Funnel">Learn more</a></p>',
      trans: { cn: ['允许网络中的用户将互联网流量路由至其 Tailscale 节点。{a}', '了解更多'] },
    },

    {
      dom: '<p class="max-w-lg text-text-muted mb-4 md:mb-0">Verify node keys distributed by the coordination server before trusting them. <a href="https://tailscale.com/kb/1226/tailnet-lock/" target="_blank" rel="noopener noreferrer" class="link whitespace-nowrap" aria-label="Read documentation about Tailnet Lock">Learn more</a></p>',
      trans: { cn: ['在信任协调服务器分发的节点密钥前，对其进行验证。{a}', '了解更多'] },
    },

    {
      dom: '<p class="max-w-lg text-text-muted mb-4 md:mb-0">Enable the redesigned macOS client with a dedicated windowed interface. Find devices and exit nodes faster with search, get clearer connectivity error messages, and easily access features like Taildrop and ping. Requires Tailscale v1.88 or later. <a href="https://tailscale.com/blog/windowed-macos-ui-beta" target="_blank" rel="noopener noreferrer" class="link whitespace-nowrap" aria-label="Read documentation about Redesigned MacOS Client UI">Learn more</a></p>',
      trans: {
        cn: [
          '启用具有专用窗口界面的新版 macOS 客户端。通过搜索功能更快地查找设备和出口节点，获得更清晰的连接错误信息，并轻松访问 Taildrop 和 Ping 等功能。需要 Tailscale v1.88 或更高版本。{a}',
          '了解更多',
        ],
      },
    },

    {
      dom: '<p class="max-w-lg text-text-muted mb-4 md:mb-0">Allow users to provision HTTPS certificates for their devices. <a href="https://tailscale.com/kb/1153/enabling-https/" target="_blank" rel="noopener noreferrer" class="link whitespace-nowrap" aria-label="Read documentation about HTTPS">Learn more</a></p>',
      trans: { cn: ['允许用户为他们的设备签发 HTTPS 证书。{a}', '了解更多'] },
    },
    {
      dom: '<p class="max-w-lg text-text-muted mb-4 md:mb-0">Allow users on your network to send files between their own devices using Taildrop, Tailscale’s built-in file sharing feature. <a href="https://tailscale.com/kb/1106/taildrop/" target="_blank" rel="noopener noreferrer" class="link whitespace-nowrap" aria-label="Read documentation about Send Files">Learn more</a></p>',
      trans: { cn: ['允许网络用户使用 Taildrop 在他们的设备之间发送文件，这是 Tailscale 的内置文件共享功能。{a}', '了解更多'] },
    },
    {
      dom: '<p class="max-w-lg text-text-muted mb-4 md:mb-0">Collect and display information about services running on your network in the admin panel. <a href="https://tailscale.com/kb/1100/services" target="_blank" rel="noopener noreferrer" class="link whitespace-nowrap" aria-label="Read documentation about Services Collection">Learn more</a></p>',
      trans: { cn: ['收集并在管理面板中显示您当前网络中正在运行的服务信息。{a}', '了解更多'] },
    },
    {
      dom: '<p class="max-w-lg text-text-muted mb-4 md:mb-0">Allow users on your network to use Mullvad VPN endpoints as exit-nodes. <a href="https://tailscale.com/kb/1258/mullvad-exit-nodes/" target="_blank" rel="noopener noreferrer" class="link whitespace-nowrap" aria-label="Read documentation about Mullvad VPN">Learn more</a></p>',
      trans: { cn: ['允许网络用户使用 Mullvad VPN 端点作为出口节点。{a}', '了解更多'] },
    },
    {
      dom: '<span class="flex-1 font-normal text-text-base">Add AWS VM</span>',
      trans: { cn: '添加 AWS 虚拟机' },
    },
    {
      dom: '<span class="flex-1 font-normal text-text-base">Google Cloud Platform</span>',
      trans: { cn: 'Google Cloud 平台' },
    },
    {
      dom: '<div role="menuitem" class="block px-4 py-2 cursor-pointer hover:enabled:bg-bg-menu-item-hover focus:outline-none focus:bg-bg-menu-item-hover" type="item" label="Edit machine name…" tabindex="-1" data-orientation="vertical" data-radix-collection-item="">Edit machine name…</div>',
      trans: { cn: '编辑设备名称' },
    },
    {
      dom: '<div role="menuitem" class="block px-4 py-2 cursor-pointer hover:enabled:bg-bg-menu-item-hover focus:outline-none focus:bg-bg-menu-item-hover" type="item" label="Edit machine IPv4…" tabindex="-1" data-orientation="vertical" data-radix-collection-item="">Edit machine IPv4…</div>',
      trans: { cn: '编辑设备 IPv4 地址' },
    },

    {
      dom: '<div role="menuitem" class="block px-4 py-2 cursor-pointer hover:enabled:bg-bg-menu-item-hover focus:outline-none focus:bg-bg-menu-item-hover" type="item" label="Share…" tabindex="-1" data-orientation="vertical" data-radix-collection-item="">Share…</div>',
      trans: { cn: '分享' },
    },
    {
      dom: '<div role="menuitem" class="block px-4 py-2 cursor-pointer hover:enabled:bg-bg-menu-item-hover focus:outline-none focus:bg-bg-menu-item-hover" type="item" label="Disable key expiry" tabindex="-1" data-orientation="vertical" data-radix-collection-item="">Disable key expiry</div>',
      trans: { cn: '禁用密钥有效期' },
    },

    {
      dom: '<div role="menuitem" class="block px-4 py-2 cursor-pointer hover:enabled:bg-bg-menu-item-hover focus:outline-none focus:bg-bg-menu-item-hover" type="item" label="Disable key expiry" tabindex="-1" data-orientation="vertical" data-radix-collection-item="">Disable key expiry</div>',
      trans: { cn: '禁用密钥有效期' },
    },
    {
      dom: '<input type="text" class="input px-8" name="query" placeholder="Search by name, owner, tag, version..." value="">',
      trans: { cn: '搜索设备名称、所有者、标签、版本...' },
      placeholder: true, // 新增这个标记
    },

    {
      dom: '<a class="stretched-link" href="/admin/logs?targetSearch=nSph6Tzdax11CNTRL">View recent activity</a>',
      trans: { cn: '查看最近活动' },
    },

    {
      dom: '<div role="menuitem" class="block px-4 py-2 cursor-pointer hover:enabled:bg-bg-menu-item-hover focus:outline-none focus:bg-bg-menu-item-hover" type="item" label="Edit route settings…" tabindex="-1" data-orientation="vertical" data-radix-collection-item="">Edit route settings…</div>',
      trans: { cn: '编辑路由设置' },
    },

    {
      dom: '<div role="menuitem" class="block px-4 py-2 cursor-pointer hover:enabled:bg-bg-menu-item-hover focus:outline-none focus:bg-bg-menu-item-hover" type="item" label="Edit ACL tags…" tabindex="-1" data-orientation="vertical" data-radix-collection-item="">Edit ACL tags…</div>',
      trans: { cn: '编辑 ACL 标签' },
    },

    {
      dom: '<div role="menuitem" class="block px-4 py-2 cursor-pointer hover:enabled:bg-bg-menu-item-hover focus:outline-none focus:bg-bg-menu-item-hover text-text-danger" type="item" label="Remove…" tabindex="-1" data-orientation="vertical" data-radix-collection-item="">Remove…</div>',
      trans: { cn: '移除设备' },
    },

    {
      dom: '<span><span class="inline-block w-2 h-2 rounded-full bg-green-300 dark:bg-green-400 mr-2"></span>Connected</span>',
      trans: { cn: '已连接' },
    },

    {
      dom: [
        '<div role="menuitem" class="block px-4 py-2 cursor-pointer hover:enabled:bg-bg-menu-item-hover focus:outline-none focus:bg-bg-menu-item-hover flex items-center select-none block px-4 py-2 cursor-pointer hover:enabled:bg-bg-menu-item-hover focus:outline-none focus:bg-bg-menu-item-hover" tabindex="-1" data-orientation="vertical" data-radix-collection-item=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-plus text-text-muted mr-2" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M8 12h8"></path><path d="M12 8v8"></path></svg>Auto-update</div>',
        '<div class="font-medium">Auto-update</div>',
      ],
      trans: { cn: '自动更新' },
    },

    {
      dom: [
        '<div role="menuitem" class="block px-4 py-2 cursor-pointer hover:enabled:bg-bg-menu-item-hover focus:outline-none focus:bg-bg-menu-item-hover flex items-center select-none block px-4 py-2 cursor-pointer hover:enabled:bg-bg-menu-item-hover focus:outline-none focus:bg-bg-menu-item-hover" tabindex="-1" data-orientation="vertical" data-radix-collection-item=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-plus text-text-muted mr-2" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M8 12h8"></path><path d="M12 8v8"></path></svg>Managed by</div>',
        '<div class="font-medium">Managed by</div>',
      ],
      trans: { cn: '设备归属' },
    },

    {
      dom: '<div role="menuitem" class="block px-4 py-2 cursor-pointer hover:enabled:bg-bg-menu-item-hover focus:outline-none focus:bg-bg-menu-item-hover flex items-center select-none block px-4 py-2 cursor-pointer hover:enabled:bg-bg-menu-item-hover focus:outline-none focus:bg-bg-menu-item-hover" tabindex="-1" data-orientation="vertical" data-radix-collection-item=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-plus text-text-muted mr-2" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M8 12h8"></path><path d="M12 8v8"></path></svg>Shared</div>',
      trans: { cn: '共享方式' },
    },
    {
      dom: [
        '<div role="menuitem" class="block px-4 py-2 cursor-pointer hover:enabled:bg-bg-menu-item-hover focus:outline-none focus:bg-bg-menu-item-hover flex items-center select-none block px-4 py-2 cursor-pointer hover:enabled:bg-bg-menu-item-hover focus:outline-none focus:bg-bg-menu-item-hover" tabindex="-1" data-orientation="vertical" data-radix-collection-item=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-plus text-text-muted mr-2" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M8 12h8"></path><path d="M12 8v8"></path></svg>Disabled</div>',
        '<div>Disabled</div>',
      ],
      trans: { cn: '禁用方式' },
    },
    {
      dom: ['<div>Currently connected</div>', '<span style="pointer-events: none;">Currently connected</span>'],
      trans: { cn: '当前已连接' },
    },
    {
      dom: ['<div>Not currently connected</div>', '<span style="pointer-events: none;">Not currently connected</span>'],
      trans: { cn: '当前未连接' },
    },
    {
      dom: ['<div>In the last</div>', '<span style="pointer-events: none;">In the last</span>'],
      trans: { cn: '上次连接' },
    },
    {
      dom: ['<div>Before the last</div>', '<span style="pointer-events: none;">Before the last</span>'],
      trans: { cn: '上次连接之前' },
    },

    {
      dom: ['<div>Enabled</div>'],
      trans: { cn: '启用' },
    },

    {
      dom: ['<div>Shared</div>'],
      trans: { cn: '共享方式' },
    },

    {
      dom: '<div>Not shared</div>',
      trans: { cn: '未共享' },
    },

    {
      dom: '<div>Shared by your tailnet</div>',
      trans: { cn: '网络共享' },
    },

    {
      dom: '<div>Shared with your tailnet</div>',
      trans: { cn: '资源共享' },
    },

    {
      dom: '<button class="px-2 hover:bg-bg-menu-item-hover first:rounded-l-md focus:outline-none focus:ring" aria-label="/.+/">Share…</button>',
      trans: { cn: '共享' },
    },
    {
      dom: [
        '<div role="menuitem" class="block px-4 py-2 cursor-pointer hover:enabled:bg-bg-menu-item-hover focus:outline-none focus:bg-bg-menu-item-hover flex items-center select-none block px-4 py-2 cursor-pointer hover:enabled:bg-bg-menu-item-hover focus:outline-none focus:bg-bg-menu-item-hover" tabindex="-1" data-orientation="vertical" data-radix-collection-item=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-plus text-text-muted mr-2" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M8 12h8"></path><path d="M12 8v8"></path></svg>Property</div>',
        '<div class="font-medium">Property</div>',
      ],
      trans: { cn: '属性' },
    },

    {
      dom: '<div>Ephemeral node</div>',
      trans: { cn: '临时节点' },
    },
    {
      dom: '<div>Exit node</div>',
      trans: { cn: '出口节点' },
    },
    {
      dom: '<div>Subnet</div>',
      trans: { cn: '子网' },
    },
    {
      dom: '<div>Tailscale SSH</div>',
      trans: { cn: 'Tailscale SSH' },
    },
    {
      dom: '<div>Tailscale Funnel</div>',
      trans: { cn: 'Tailscale Funnel' },
    },
    {
      dom: '<div>Connector</div>',
      trans: { cn: '连接器' },
    },
    {
      dom: [
        '<div role="menuitem" class="block px-4 py-2 cursor-pointer hover:enabled:bg-bg-menu-item-hover focus:outline-none focus:bg-bg-menu-item-hover flex items-center select-none block px-4 py-2 cursor-pointer hover:enabled:bg-bg-menu-item-hover focus:outline-none focus:bg-bg-menu-item-hover" tabindex="-1" data-orientation="vertical" data-radix-collection-item=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-plus text-text-muted mr-2" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M8 12h8"></path><path d="M12 8v8"></path></svg>OS Version</div>',
        '<div class="font-medium">OS Version</div>',
      ],
      trans: { cn: '操作系统版本' },
    },

    {
      dom: [
        '<th class="hidden lg:block md:flex-auto">Last Seen</th>',
        '<div role="menuitem" class="block px-4 py-2 cursor-pointer hover:enabled:bg-bg-menu-item-hover focus:outline-none focus:bg-bg-menu-item-hover flex items-center select-none block px-4 py-2 cursor-pointer hover:enabled:bg-bg-menu-item-hover focus:outline-none focus:bg-bg-menu-item-hover" tabindex="-1" data-orientation="vertical" data-radix-collection-item=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-plus text-text-muted mr-2" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M8 12h8"></path><path d="M12 8v8"></path></svg>Last seen</div>',
        '<div class="font-medium">Last seen</div>',
      ],
      trans: { cn: '最后连接时间' },
    },
    {
      dom: '<span class="flex items-center gap-1">Addresses<span data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info" aria-hidden="true" tabindex="0"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg></span></span>',
      trans: { cn: '地址' },
    },
    {
      dom: '<h3 class="text-lg font-semibold mb-2">Add devices to your network</h3>',
      trans: { cn: '添加设备到你的网络' },
    },
    {
      dom: [
        '<h4 class="font-normal text-gray-500 mb-1">Operating systems</h4>',
        '<div role="menuitem" class="block px-4 py-2 cursor-pointer hover:enabled:bg-bg-menu-item-hover focus:outline-none focus:bg-bg-menu-item-hover flex items-center select-none block px-4 py-2 cursor-pointer hover:enabled:bg-bg-menu-item-hover focus:outline-none focus:bg-bg-menu-item-hover" tabindex="-1" data-orientation="vertical" data-radix-collection-item=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-plus text-text-muted mr-2" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M8 12h8"></path><path d="M12 8v8"></path></svg>OS</div>',
      ],
      trans: { cn: '操作系统' },
    },
    {
      dom: '<h4 class="font-normal text-gray-500 mb-1">Cloud providers</h4>',
      trans: { cn: '云服务提供商' },
    },
    {
      dom: '<h4 class="font-normal text-gray-500 mb-1">Containers</h4>',
      trans: { cn: '容器环境' },
    },

    {
      dom: '<span class="flex-1 font-normal text-text-muted">See more</span>',
      trans: { cn: '查看更多' },
    },

    {
      dom: '<p>Tailscale works best when it’s installed on multiple devices. Explore what you can do with Tailscale in these environments.</p>',
      trans: { cn: 'Tailscale 在多设备上安装时效果最佳。了解一下在这些环境中你可以如何使用 Tailscale。' },
    },
    {
      dom: '<span class="max-w-full">Add device</span>',
      trans: { cn: '添加设备' },
    },
    {
      dom: [
        '<th class="hidden md:block w-1/4 lg:w-1/5">Version</th>',
        '<div role="menuitem" class="block px-4 py-2 cursor-pointer hover:enabled:bg-bg-menu-item-hover focus:outline-none focus:bg-bg-menu-item-hover flex items-center select-none block px-4 py-2 cursor-pointer hover:enabled:bg-bg-menu-item-hover focus:outline-none focus:bg-bg-menu-item-hover" tabindex="-1" data-orientation="vertical" data-radix-collection-item=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-plus text-text-muted mr-2" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M8 12h8"></path><path d="M12 8v8"></path></svg>Version</div>',
      ],
      trans: { cn: 'Tailscale 版本' },
    },
    {
      dom: ['<th class="md:w-1/3 flex-auto md:flex-initial md:shrink-0 w-0 text-ellipsis">Machine</th>', '<h1 class="text-3xl font-semibold tracking-tight leading-tight">Machines</h1>'],
      trans: { cn: '设备' },
    },
    {
      dom: '<div data-content="Access controls" class="/(^|\\s)navigation-link($|\\s)/">Access controls</div>',
      trans: { cn: '访问控制' },
    },
    {
      dom: '<div data-content="Users" class="/(^|\\s)navigation-link($|\\s)/">Users</div>',
      trans: { cn: '用户' },
    },
    {
      dom: '<div data-content="Apps" class="/(^|\\s)navigation-link($|\\s)/">Apps</div>',
      trans: { cn: '应用' },
    },
    {
      dom: '<span class="max-w-full">Filters</span>',
      trans: { cn: '筛选' },
    },
    {
      // 注意：Regex 匹配通常需要 class 完全对应，Tailwind class 可能会变动，这里保持原样
      dom: '<div class="inline-flex items-center align-middle justify-center font-medium text-sm border border-gray-200 dark:border-transparent bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-full px-2 py-1 leading-none mb-8">/(\\d+) machines/</div>',
      trans: { cn: '{1} 台设备' },
    },
    {
      dom: '<div data-content="Services" class="/(^|\\s)navigation-link($|\\s)/">Services</div>',
      trans: { cn: '服务' },
    },
    {
      dom: '<a href="https://tailscale.com/kb/manage-devices/" target="_blank" rel="noopener noreferrer" class="link whitespace-nowrap" aria-label="Read documentation about Read KB article about Machines">Learn more</a>',
      trans: { cn: '了解更多' },
    },
    {
      dom: '<p class="mt-2 max-w-[40rem]">Manage the devices connected to your tailnet. </p>',
      trans: { cn: '管理连接到 Tailnet 的设备。' },
    },
    {
      dom: '<button type="button" role="tab" aria-selected="true" aria-controls="radix-:r2h:-content-email" data-state="active" id="radix-:r2h:-trigger-email" class="flex items-center icon-parent px-2 py-2 first:-ml-2 rounded-md font-medium after:absolute after:bottom-0 after:right-2 after:left-2 after:h-px after:bg-text-primary after:z-10 select-none whitespace-nowrap relative top-px state-active:text-text-primary state-active:after:visible state-inactive:text-text-muted state-inactive:hover:text-text-base state-inactive:after:invisible transition ease-in-out duration-150" tabindex="-1" data-orientation="horizontal" data-radix-collection-item=""><span class="shrink-0 mr-2" data-original-text="" data-translated="true"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail" aria-hidden="true"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path><rect x="2" y="4" width="20" height="16" rx="2"></rect></svg></span>Share via email</button>',
      trans: { cn: '通过邮件共享' },
    },
    {
      dom: '<button type="button" role="tab" aria-selected="false" aria-controls="radix-:r2h:-content-copy" data-state="inactive" id="radix-:r2h:-trigger-copy" class="flex items-center icon-parent px-2 py-2 first:-ml-2 rounded-md font-medium after:absolute after:bottom-0 after:right-2 after:left-2 after:h-px after:bg-text-primary after:z-10 select-none whitespace-nowrap relative top-px state-active:text-text-primary state-active:after:visible state-inactive:text-text-muted state-inactive:hover:text-text-base state-inactive:after:invisible transition ease-in-out duration-150" tabindex="-1" data-orientation="horizontal" data-radix-collection-item=""><span class="shrink-0 mr-2" data-original-text="" data-translated="true"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg></span>Copy share link</button>',
      trans: { cn: '复制共享链接' },
    },

    {
      dom: ['<div data-content="Logs" class="/(^|\\s)navigation-link($|\\s)/">Logs</div>', '<div data-content="Logs" class="">Logs</div>'],
      trans: { cn: '日志' },
    },
    {
      dom: '<div data-content="Settings" class="/(^|\\s)navigation-link($|\\s)/">Settings</div>',
      trans: { cn: '设置' },
    },
    {
      dom: '<div data-content="Machines" class="/(^|\\s)navigation-link($|\\s)/">Machines</div>',
      trans: { cn: '设备' },
    },
    {
      dom: '<div class="inline-flex items-center align-middle justify-center font-medium text-sm border border-gray-200 dark:border-transparent bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-sm px-1 text-sm">Free</div>',
      trans: { cn: '免费版' },
    },

    {
      dom: '<div data-content="Resource hub" class="" data-original-class-name=class="/(^|\\s)navigation-link($|\\s)/" data-class-modified="true">Resource hub</div>',
      trans: { cn: '资源中心' },
    },
    {
      dom: '<div class="font-semibold text-lg truncate">Share machine</div>',
      trans: { cn: '设备共享' },
    },
    {
      // 正则匹配原文（使用捕获组 (.*) 来捕获主机名）
      dom: '<div class="mb-4">Share access to <span class="font-medium">/(.+)/</span> with external users, as allowed by ACLs. If you need multiple users in the same tailnet to access it, or if you want to share more than one machine with a user, invite users to your tailnet instead. </div>',
      trans: {
        cn: '允许通过访问控制列表来共享 {1} 设备供外部人员使用。若需同一网络中的多位人员访问该设备，或希望共享多台设备，建议将其邀请至您的 Tailnet 网络。',
      },
    },
    {
      dom: '<span class="shrink-0 mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail" aria-hidden="true"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path><rect x="2" y="4" width="20" height="16" rx="2"></rect></svg></span>',
      trans: { cn: '通过邮件邀请' },
    },
    {
      dom: '<button type="button" role="tab" aria-selected="false" aria-controls="radix-:r22:-content-copy" data-state="inactive" id="radix-:r22:-trigger-copy" class="flex items-center icon-parent px-2 py-2 first:-ml-2 rounded-md font-medium after:absolute after:bottom-0 after:right-2 after:left-2 after:h-px after:bg-text-primary after:z-10 select-none whitespace-nowrap relative top-px state-active:text-text-primary state-active:after:visible state-inactive:text-text-muted state-inactive:hover:text-text-base state-inactive:after:invisible transition ease-in-out duration-150" tabindex="-1" data-orientation="horizontal" data-radix-collection-item=""><span class="shrink-0 mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg></span>Copy share link</button>',
      trans: { cn: '复制共享链接' },
    },
    {
      dom: '<p class="text-sm text-text-muted mt-1">You can use commas to separate multiple email recipients.</p>',
      trans: { cn: '您可以使用逗号来分隔多个邮箱地址。' },
    },
    {
      dom: '<div class="w-full text-center max-w-xl text-text-muted">No external users have access</div>',
      trans: { cn: '暂无授权访问的用户' },
    },
    {
      dom: '<h2 class="text-text-muted font-medium">Tailnet Settings</h2>',
      trans: {
        cn: 'Tailnet 设置',
      },
    },
    {
      dom: '<h2 class="text-text-muted font-medium">Personal Settings</h2>',
      trans: {
        cn: '个人设置',
      },
    },
    {
      dom: '<a href="/admin/settings/keys" class="flex font-medium mt-3.5 /text-text-[^ ]*/">Keys</a>',
      trans: {
        cn: 'API 密钥',
      },
    },

    {
      dom: '<p class="mt-3 mb-10">Get early access to features. Feature previews are available for testing, but still in development. Please <a class="link" href="https://tailscale.com/contact/support">share feedback</a> on how we could make them work better.</p>',
      trans: {
        cn: ['获取功能抢先体验。功能预览版已开放测试，但仍在开发中。请 {a} 您的建议来帮助我们改进这些功能的使用体验。', '分享'],
      },
    },

    {
      dom: ['<a href="/admin/settings/general" class="flex font-medium mt-3.5 /text-text-[^ ]*/">General</a>', '<h1 class="mr-2">General</h1>'],
      trans: {
        cn: '通用设置',
      },
    },
    {
      dom: [
        '<div class="inline-flex items-center align-middle justify-center font-medium text-sm border border-yellow-50 dark:border-transparent bg-yellow-50 dark:bg-yellow-200 text-text-warning dark:text-orange-800 rounded-full px-2 py-1 leading-none ml-2">Beta</div>',
      ],
      trans: {
        cn: '测试版',
      },
    },
    {
      dom: '<a href="/admin/settings/user-management" class="flex font-medium mt-3.5 /text-text-[^ ]*/">User management</a>',
      trans: {
        cn: '用户管理',
      },
    },
    {
      dom: '<a href="/admin/settings/device-management" class="flex font-medium mt-3.5 /text-text-[^ ]*/">Device management</a>',
      trans: {
        cn: '设备管理',
      },
    },
    {
      dom: '<a href="/admin/settings/policy-file-management" class="flex font-medium mt-3.5 /text-text-[^ ]*/">Policy file management</a>',
      trans: {
        cn: '策略文件管理',
      },
    },
    {
      dom: '<a href="/admin/settings/trust-credentials" class="flex font-medium mt-3.5 /text-text-[^ ]*/">Trust credentials</a>',
      trans: {
        cn: '可信凭证',
      },
    },

    {
      dom: '<a href="/admin/settings/contact-preferences" class="flex font-medium mt-3.5 /text-text-[^ ]*/">Contact preferences</a>',
      trans: {
        cn: '通信偏好',
      },
    },
    {
      dom: '<a href="/admin/settings/billing" class="flex font-medium mt-3.5 /text-text-[^ ]*/">Billing</a>',
      trans: {
        cn: '账单',
      },
    },
  ];

  // Retain the upstream dictionary, but match known UI text instead of Tailwind
  // classes or session-specific React/Radix IDs. Never rebuild page elements.
  const additionalTranslations = [
    ['Network', '网络'], ['Machines', '设备'], ['Apps', '应用'],
    ['Services', '服务'], ['Users', '用户'], ['Access controls', '访问控制'],
    ['Logs', '日志'], ['Settings', '设置'], ['Resource hub', '资源中心'],
    ['Help', '帮助'], ['Free', '免费版'], ['Give feedback', '提供反馈'],
    ['Advertised', '已通告'], ['Discovered', '已发现'],
    ['Services advertised and discovered within your network.', '在您的网络中通告和发现的服务。'],
    ['See how services work', '了解服务的工作原理'],
    ['Define your first Service', '定义您的第一个服务'],
    ['Share Services in your tailnet by advertising Services from your devices.', '通过设备通告服务，在您的 Tailnet 中共享服务。'],
    ['1. Define a Service', '1. 定义服务'],
    ['Name, describe, and give identity to the process or data the Service will provide.', '为服务提供的进程或数据命名、添加描述并设置身份标识。'],
    ['2. Advertise and serve', '2. 通告并提供服务'],
    ['From the host, advertise the Service ports from which it will serve.', '在主机上通告提供服务的端口。'],
    ['3. Approve', '3. 批准'],
    ["Review proper configuration and approve each Service’s hosts, manually or automatically.", '检查配置，并手动或自动批准各服务的主机。'],
    ['Define Service', '定义服务'], ['Define a Service', '定义服务'],
    ['Learn more', '了解更多'], ['Save', '保存'], ['Save changes', '保存更改'],
    ['Cancel', '取消'], ['Close', '关闭'], ['Confirm', '确认'],
    ['Search', '搜索'], ['Name', '名称'], ['Description', '描述'],
    ['Status', '状态'], ['Actions', '操作'], ['Tags', '标签'],
    ['Ports', '端口'], ['Hosts', '主机'], ['Add service', '添加服务'],
    ['No services found', '未找到服务'], ['Connected', '已连接'],
    ['Disconnected', '未连接'], ['Enabled', '已启用'], ['Disabled', '已禁用'],
    ['Share…', '共享'], ['Search by name, owner, tag, version...', '搜索设备名称、所有者、标签、版本…'],
  ];
  const textTranslations = new Map();
  const STORAGE_KEY = 'tailscale-cn.language';
  const UI_ID = 'ts-translator-root';
  const ATTRIBUTES = ['data-content', 'aria-label', 'placeholder', 'title'];
  const EXCLUDED = [
    'script', 'style', 'noscript', 'template', 'svg', 'math', 'code', 'pre',
    'textarea', 'input', 'select', 'option', '[contenteditable]:not([contenteditable="false"])',
    '[role="textbox"]', '[translate="no"]', '.notranslate', '.monaco-editor',
    '.cm-editor', '.CodeMirror', '.font-mono', `#${UI_ID}`,
    'a[href^="/admin/machines/"]', 'a[href^="/admin/users/"]',
  ].join(',');
  const originalText = new Map();
  const originalAttributes = new Map();
  const pendingRoots = new Set();
  let currentLang = 'cn';
  let observer;
  let translateTimer = null;
  let updateUI = () => {};

  function normalize(value) {
    return value.replace(/\s+/g, ' ').replace(/…/g, '...').replace(/[’‘]/g, "'").trim().toLowerCase();
  }

  function addTranslation(source, translated) {
    if (typeof source !== 'string' || typeof translated !== 'string') return;
    const key = normalize(source);
    if (key && !/^\/.*\/[a-z]*$/i.test(key) && !/\{\d+\}|\$\d+/.test(translated)) {
      textTranslations.set(key, translated);
    }
  }

  function compileDictionary() {
    for (const item of translations) {
      for (const html of Array.isArray(item.dom) ? item.dom : [item.dom]) {
        // <template> also parses table cells without the browser discarding them.
        const template = document.createElement('template');
        template.innerHTML = html;
        const element = template.content.firstElementChild;
        if (!element) continue;
        const translated = item.trans.cn;
        if (item.placeholder) {
          addTranslation(element.getAttribute('placeholder') || '', translated);
          continue;
        }
        if (Array.isArray(translated)) {
          const link = element.querySelector('a');
          if (link && translated.length === 2 && translated[0].includes('{a}')) {
            const [before, after] = translated[0].split('{a}');
            const nodes = Array.from(element.childNodes);
            const index = nodes.indexOf(link);
            if (index >= 0) {
              addTranslation(nodes.slice(0, index).map(node => node.textContent).join(''), before);
              addTranslation(link.textContent, translated[1]);
              addTranslation(nodes.slice(index + 1).map(node => node.textContent).join(''), after);
            }
          }
          continue;
        }
        // Keep a dynamic hostname in its existing span, translating only the
        // surrounding fixed sentence. No interpolation into live HTML.
        const regexChild = Array.from(element.children).find(child => /^\/.*\/[a-z]*$/i.test(child.textContent.trim()));
        if (regexChild) {
          const parts = typeof translated === 'string' ? translated.split(/\{1\}|\$1/) : [];
          if (parts.length === 2) {
            const nodes = Array.from(element.childNodes);
            const index = nodes.indexOf(regexChild);
            addTranslation(nodes.slice(0, index).map(node => node.textContent).join(''), parts[0]);
            addTranslation(nodes.slice(index + 1).map(node => node.textContent).join(''), parts[1]);
          }
          continue;
        }
        const direct = Array.from(element.childNodes)
          .filter(node => node.nodeType === Node.TEXT_NODE)
          .map(node => node.data).join('');
        addTranslation(direct || element.textContent, translated);
      }
    }
    for (const [source, translated] of additionalTranslations) addTranslation(source, translated);
  }

  function lookup(value, node = null) {
    const key = normalize(value);
    const count = key.match(/^(\d+) machines?$/);
    let translated = count ? `${count[1]} 台设备` : textTranslations.get(key);
    // React sometimes renders a count and its noun as separate text nodes.
    if (node && /^machines?$/.test(key) && node.previousSibling?.nodeType === Node.TEXT_NODE && /^\d+\s*$/.test(node.previousSibling.data)) {
      translated = '台设备';
    }
    if (translated === undefined) return null;
    const whitespace = value.match(/^(\s*)[\s\S]*?(\s*)$/);
    return whitespace[1] + translated + whitespace[2];
  }

  function isExcluded(element) {
    return !element || Boolean(element.closest(EXCLUDED));
  }

  function translateText(node) {
    const record = originalText.get(node);
    if (currentLang === 'en' || isExcluded(node.parentElement)) {
      if (record && node.data === record.translated) node.data = record.original;
      originalText.delete(node);
      return;
    }
    if (record && node.data === record.translated) return;
    // A framework may reuse the node for different content. Adopt its latest
    // English value instead of restoring a stale value on the next switch.
    originalText.delete(node);
    const original = node.data;
    const translated = lookup(original, node);
    if (translated !== null && translated !== original) {
      originalText.set(node, { original, translated });
      node.data = translated;
    }
  }

  function translateAttributes(element) {
    // Input values and application identifiers (id, href, name, value, etc.)
    // are intentionally never changed. data-content is the sidebar's visible
    // CSS-generated label and must be translated along with its text node.
    const input = element.matches('input');
    const excluded = isExcluded(input ? element.parentElement : element);
    let records = originalAttributes.get(element);
    for (const name of ATTRIBUTES) {
      const record = records?.get(name);
      const value = element.getAttribute(name);
      if (currentLang === 'en' || excluded) {
        if (record && value === record.translated) element.setAttribute(name, record.original);
        records?.delete(name);
        continue;
      }
      if (record && value === record.translated) continue;
      records?.delete(name);
      if (value === null) continue;
      const translated = lookup(value);
      if (translated !== null && translated !== value) {
        if (!records) {
          records = new Map();
          originalAttributes.set(element, records);
        }
        records.set(name, { original: value, translated });
        element.setAttribute(name, translated);
      }
    }
    if (records && records.size === 0) originalAttributes.delete(element);
  }

  function translateSubtree(root) {
    if (!root.isConnected) return;
    if (root.nodeType === Node.TEXT_NODE) {
      translateText(root);
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE || root.id === UI_ID) return;
    translateAttributes(root);
    // Walk the existing nodes; assigning textContent/innerHTML to live page
    // elements would remove icons, links, event listeners and React children.
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeType === Node.TEXT_NODE) translateText(node);
      else translateAttributes(node);
    }
  }

  function observe() {
    observer.observe(document.body, {
      subtree: true, childList: true, characterData: true, attributes: true,
      attributeFilter: [...ATTRIBUTES, 'contenteditable', 'translate', 'class'],
    });
  }

  function collectMutations(mutations) {
    for (const mutation of mutations) {
      if ((mutation.target.parentElement || mutation.target).closest?.(`#${UI_ID}`)) continue;
      if (mutation.type === 'childList') {
        if (mutation.removedNodes.length) pendingRoots.add(mutation.target);
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) pendingRoots.add(node);
        }
      } else {
        pendingRoots.add(mutation.target);
      }
    }
  }

  function flush() {
    translateTimer = null;
    collectMutations(observer.takeRecords());
    // Disconnect only while making synchronous edits. Our own translations
    // must not cause an observer feedback loop or an endless polling timer.
    observer.disconnect();
    try {
      const roots = Array.from(pendingRoots);
      pendingRoots.clear();
      const rootSet = new Set(roots);
      for (const root of roots) {
        let covered = false;
        for (let parent = root.parentElement; parent; parent = parent.parentElement) {
          if (rootSet.has(parent)) { covered = true; break; }
        }
        if (!covered) translateSubtree(root);
      }
      for (const [node, record] of originalText) {
        if (!node.isConnected) {
          if (node.data === record.translated) node.data = record.original;
          originalText.delete(node);
        }
      }
      for (const [element, records] of originalAttributes) {
        if (!element.isConnected) {
          for (const [name, record] of records) {
            if (element.getAttribute(name) === record.translated) element.setAttribute(name, record.original);
          }
          originalAttributes.delete(element);
        }
      }
    } finally {
      observe();
    }
  }

  function switchLanguage(lang) {
    if (lang !== 'cn' && lang !== 'en') return;
    currentLang = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* Storage may be blocked. */ }
    if (translateTimer !== null) clearTimeout(translateTimer);
    collectMutations(observer.takeRecords());
    observer.disconnect();
    if (lang === 'en') {
      for (const [node, record] of originalText) {
        if (node.data === record.translated) node.data = record.original;
      }
      for (const [element, records] of originalAttributes) {
        for (const [name, record] of records) {
          if (element.getAttribute(name) === record.translated) element.setAttribute(name, record.original);
        }
      }
      originalText.clear();
      originalAttributes.clear();
    }
    pendingRoots.add(document.body);
    flush();
    updateUI();
  }

  function createTranslatorUI() {
    const host = document.createElement('div');
    host.id = UI_ID;
    // Inline positioning also works when the site's CSP blocks custom styles.
    Object.assign(host.style, { position: 'fixed', right: '24px', bottom: '24px', zIndex: '2147483647' });
    host.setAttribute('translate', 'no');
    const shadow = host.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        :host { color-scheme: light; font: 14px/1.5 system-ui, sans-serif; }
        button { font: inherit; cursor: pointer; border: 0; }
        button:focus-visible { outline: 3px solid #759af5; outline-offset: 3px; }
        #toggle { width: 50px; height: 50px; border-radius: 50%; background: #333; color: #fff;
          box-shadow: 0 3px 16px #0003; font-size: 22px; }
        #menu { position: absolute; right: 0; bottom: 62px; min-width: 154px; padding: 6px;
          border: 1px solid #ddd; border-radius: 10px; background: #fff; box-shadow: 0 4px 20px #0002; }
        #menu[hidden] { display: none; }
        #menu button { display: block; width: 100%; padding: 9px 12px; border-radius: 6px;
          text-align: left; background: #fff; color: #222; }
        #menu button:hover { background: #f2f4f7; }
        #menu button[aria-pressed="true"] { color: #315fc5; background: #edf2ff; }
      </style>
      <div id="menu" hidden aria-label="语言 / Language">
        <button type="button" data-lang="cn">简体中文</button>
        <button type="button" data-lang="en">English</button>
      </div>
      <button id="toggle" type="button" aria-label="切换语言 / Switch language" aria-expanded="false" aria-controls="menu">译</button>`;
    const menu = shadow.getElementById('menu');
    const toggle = shadow.getElementById('toggle');
    function closeMenu() { menu.hidden = true; toggle.setAttribute('aria-expanded', 'false'); }
    toggle.addEventListener('click', () => {
      menu.hidden = !menu.hidden;
      toggle.setAttribute('aria-expanded', String(!menu.hidden));
    });
    shadow.querySelectorAll('[data-lang]').forEach(button => {
      button.addEventListener('click', () => { switchLanguage(button.dataset.lang); closeMenu(); });
    });
    document.addEventListener('click', event => { if (!event.composedPath().includes(host)) closeMenu(); });
    shadow.addEventListener('keydown', event => { if (event.key === 'Escape') { closeMenu(); toggle.focus(); } });
    updateUI = () => shadow.querySelectorAll('[data-lang]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.lang === currentLang));
    });
    document.body.appendChild(host);
    updateUI();
  }

  function init() {
    if (document.getElementById(UI_ID)) return;
    try { if (localStorage.getItem(STORAGE_KEY) === 'en') currentLang = 'en'; } catch { /* Default to Chinese. */ }
    compileDictionary();
    createTranslatorUI();
    observer = new MutationObserver(mutations => {
      collectMutations(mutations);
      if (translateTimer === null && pendingRoots.size) translateTimer = setTimeout(flush, 30);
    });
    pendingRoots.add(document.body);
    flush();
  }

  if (document.body) init();
  else document.addEventListener('DOMContentLoaded', init, { once: true });
})();
