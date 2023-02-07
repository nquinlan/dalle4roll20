# dalle4roll20 ![dalle4roll20 icon](/assets/img/128x128.png?raw=true)

This extension adds a DALL•E 2 "Search" to the Art Library tab of Roll20, allowing you to create assets without leaving the VTT.

<img src="https://framerusercontent.com/images/bRjsCV6C2gbKipvWVJ3ItluWY.png" height="16"/> It was originally created as part of [MLH Global Hack Week: AI/MLH Week](https://ghw.mlh.io/events/ai) in [a livestream](https://www.youtube.com/live/mqTZFpFzWZ4?feature=share), you can see the code as it was at [ff0ed29](https://github.com/nquinlan/dalle4roll20/commit/ff0ed298d2a632a53eca89d2d3b89fec89c0c891).

_DALL•E images are subject to the [Content Policy](https://labs.openai.com/policies/content-policy) and [Terms of Use](https://openai.com/terms/) of Open AI._

## Installation & Usage

This extension has yet to be released in the Chrome webstore. If you'd like to use it:

1. Download the latest release ([`release.zip`](/release.zip)).
2. Navigate to the Chrome Extensions screen (`chrome://extensions`)
3. Ensure "Developer mode" is on, using the toggle in the top right corner of the screen.
4. Select "Load unpacked", navigating to this extension on your computer.

Additionally, in order to use this plugin, you'll need to register for an [OpenAI API Key](https://platform.openai.com/account/api-keys). The DALLE•2 API is metered and you will need to pay per request as detailed on [Open AI's pricing page](https://openai.com/api/pricing/).

Once you have the asset up and running, and your API key stored, you can make any "search" and get results per your prompt & parameters. Clicking an image downloads it. You may then drag to upload it to your Roll20 asset library.

## Development 

This extension was created with [Extension CLI](https://oss.mobilefirst.me/extension-cli/)!

To get started, clone this repo to your machine, and then run `npm run start` to get going.

### Available Commands

| Commands | Description |
| --- | --- |
| `npm run start` | build extension, watch file changes |
| `npm run build` | generate release version |
| `npm run docs` | generate source code docs |
| `npm run clean` | remove temporary files |
| `npm run test` | run unit tests |
| `npm run sync` | update config files |

For CLI instructions see [User Guide &rarr;](https://oss.mobilefirst.me/extension-cli/)

### Learn More

**Extension Developer guides**

- [Getting started with extension development](https://developer.chrome.com/extensions/getstarted)
- Manifest configuration: [version 2](https://developer.chrome.com/extensions/manifest) - [version 3](https://developer.chrome.com/docs/extensions/mv3/intro/)
- [Permissions reference](https://developer.chrome.com/extensions/declare_permissions)
- [Chrome API reference](https://developer.chrome.com/docs/extensions/reference/)

**Extension Publishing Guides**

- [Publishing for Chrome](https://developer.chrome.com/webstore/publish)
- [Publishing for Edge](https://docs.microsoft.com/en-us/microsoft-edge/extensions-chromium/publish/publish-extension)
- [Publishing for Opera addons](https://dev.opera.com/extensions/publishing-guidelines/)
- [Publishing for Firefox](https://extensionworkshop.com/documentation/publish/submitting-an-add-on/)
