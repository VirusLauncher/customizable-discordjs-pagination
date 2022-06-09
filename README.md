# customizable-discordjs-pagination
<p>
   <a href="https://www.npmjs.com/package/customizable-discordjs-pagination"><img src="https://nodei.co/npm/customizable-discordjs-pagination.png?downloadRank=true&downloads=true&downloadRank=true&stars=true" /></a>  <a href="https://discord.gg/ju8kxnvnCw"><img src="https://discordapp.com/api/guilds/748607784735604857/widget.png?style=banner2" alt="Discord Banner2"/></a>
</p>
This package features a fully customizable embed pagination for DiscordJS V13 and V14. The User can modify the buttons to their liking and enable/disable Select Menu.

## Install package
```sh
npm install customizable-discordjs-pagination
```

## Example
```js
const Pagination = require('customizable-discordjs-pagination');

// Make Embeds using DiscordJS package
const pages = [embed1, embed2, embed3, ...];
// DiscordJS V13
const buttons = [
{ label: 'Previous', emoji: '⬅', style: 'DANGER' },
{ label: 'Next', emoji: '➡', style: 'SUCCESS' },
]

Pagination.V13Pagination(Discord, message, pages, buttons, {timeout: 120000, selectMenu: true, selectMenuPlaceholder: 'Select Page', ephemeral: false, resetTimer: true, disableEnd: true});

// DiscordJS V14
const buttons = [
{ label: 'Previous', emoji: '⬅', style: Discord.ButtonStyle.Danger },
{ label: 'Next', emoji: '➡', style: Discord.ButtonStyle.Success },
]

Pagination.V14Pagination(Discord, message, pages, buttons, {timeout: 120000, selectMenu: true, selectMenuPlaceholder: 'Select Page', ephemeral: false, resetTimer: true, disableEnd: true});
```

## Screenshots
##### 2 Buttons - Previous and Next
![Imgur](https://imgur.com/4Mo8vLv.jpg)
##### 3 Buttons - Previous, Stop and Next
![Imgur](https://imgur.com/WalreF6.jpg)
##### 4 Buttons - First, Previous, Next, Last
![Imgur](https://imgur.com/9854jTq.jpg)
##### 5 Buttons - First, Previous, Stop, Next, Last
![Imgur](https://imgur.com/vKgBYog.jpg)

## Documentation
- For DiscordJS V13:
```js
V13Pagination(Discord, message, pages, buttons = [], { timeout = 120000, selectMenu = false, selectMenuPlaceholder = 'Select Page', ephemeral = false, disableEnd = true })
```
- For DiscordJS V14: 
```js
V14Pagination(Discord, message, pages, buttons = [], { timeout = 120000, selectMenu = false, selectMenuPlaceholder = 'Select Page', ephemeral = false, disableEnd = true })
```

### Parameters
| Name | Optional | Default | Details |
| --- | --- | --- | --- |
| Discord | ❌ | - | Pass the Discord package to be accessible in the function | 
| message |  ❌ | - | Message or Slash Interaction Accepted | 
| pages |  ❌ | - | Array of MessageEmbeds/ButtonBuilder(Pages) |  
| buttons | ✔️ | [] | Array of objects containing styles, labels and/or emojis for the buttons |
| timeout | ✔️ | 120000| Timeout in Milliseconds |
| selectMenu | ✔️ | false | Boolean value for SelectMenu  (Page Limit: 25) | 
| selectMenuPlaceholder | ✔️ | 'Select Page' | Placeholder for select menu | 
| ephemeral | ✔️ | false | Whether the reply should be ephemeral (Interaction Only) |
| resetTimer | ✔️ | true | Reset timer once an interaction is clicked. |
| disableEnd | ✔️ | true | true: Components disabled. false: Components disappeared  | 

### ButtonList
ButtonList should be an Array of objects.
| Parameter | Type | Details |
| --- | --- | --- |
| label | String | The text to be displayed on this button |
| emoji | [String](https://discord.js.org/#/docs/discord.js/13.8.0/typedef/EmojiIdentifierResolvable) | The emoji to be displayed on this button |
| style | [String](https://discord.js.org/#/docs/discord.js/13.8.0/typedef/MessageButtonStyleResolvable) | The style of this button |


## Bots that use this package
| Avatar | Name |
| --- | --- |
| ![](https://cdn.discordapp.com/avatars/710177042490064958/f6177ea17f6da9318d83b5f5d4579bc4.png?size=48) | [Toating Bot](https://discord.com/api/oauth2/authorize?client_id=710177042490064958&permissions=4063624560&scope=bot%20applications.commands) |
