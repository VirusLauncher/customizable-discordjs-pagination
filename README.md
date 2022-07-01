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
const PaginationBuilder = require('customizable-discordjs-pagination');

// Make Embeds using DiscordJS package
const pages = [embed1, embed2, embed3, ...];

// DiscordJS V13
const buttons = [
{ label: 'Previous', emoji: '⬅', style: 'DANGER' },
{ label: 'Next', emoji: '➡', style: 'SUCCESS' },
]

new PaginationBuilder()
   .setCommand(message)
   .setPages(pages)
   .setButtons(buttons)
   .setPaginationCollector({ timeout: 120000})
   .setSelectMenu({ enable: true })
   .send();
   
// DiscordJS V14
const buttons = [
{ label: 'Previous', emoji: '⬅', style: Discord.ButtonStyle.Danger },
{ label: 'Next', emoji: '➡', style: Discord.ButtonStyle.Success },
]

new PaginationBuilder()
   .setCommand(message)
   .setPages(pages)
   .setButtons(buttons)
   .setPaginationCollector({ timeout: 120000})
   .setSelectMenu({ enable: true })
   .execute();
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
- For DiscordJS V13/V14:
```js
new PaginationBuilder()
   .setCommand(message)
   .setPages(pages)
   .setButtons(buttons)
   .setPaginationCollector({ timeout: 120000 })
   .setSelectMenu({ enable: true })
   .send();
```

## Parameters
| Name | Optional  | Details |
| --- | --- | ---  |
| command | ❌ | Message or Slash Interaction Accepted | 
| pages | ❌ | Array of MessageEmbeds(DiscordJS V13) or EmbedBuilder(DiscordJS V14) |  
| buttons | ✔️ | Array of objects containing styles, labels and/or emojis for the buttons |
| selectMenu | ✔️ | Optional Object to set Select Menu Options | 
| paginationCollector | ✔️ | Optional Object to set Collector Options | 

## Optional Parameters
### Buttons
buttons should be an Array of objects.
Default: An Empty Array( [] )

| Parameter | Type | Details |
| --- | --- | --- |
| label | String | The text to be displayed on this button |
| emoji | [Emoji](https://discord.js.org/#/docs/discord.js/13.8.0/typedef/EmojiIdentifierResolvable) | The emoji to be displayed on this button |
| style | [ButtonStyle](https://discord.js.org/#/docs/discord.js/13.8.0/typedef/MessageButtonStyle) | The style of this button |

### SelectMenu
selectMenu should be an Object.
| Parameter | Type | Default | Details |
| --- | --- | --- | --- |
| enable | Boolean | false | Set to true to enable Select Menu |
| placeholder | String | 'Select Page' |The text to be displayed as placeholder for the Select Menu |
| pageOnly | Boolean | false | True: Forced Select Menu Options is page numbers, False: Select Menu Options is the Embed Title(if different) otherwise page numbers |

### PaginationCollector
paginationCollector should be an Object.
| Parameter | Type | Default | Details |
| --- | --- | --- | --- |
| timeout | Number | 120000 | The time in milliseconds before the Pagination Collector times out |
| ephemeral | Boolean | false | Set to true to make the Pagination Collector ephemeral |
| resetTimer | Boolean | true | Set to true to reset the Pagination Collector timer |
| disableEnd | Boolean | true | Set to true to disable the Pagination Interactions, Set to false to disappear the Pagination Interactions |


## Bots that use this package
| Avatar | Name |
| --- | --- |
| ![](https://cdn.discordapp.com/avatars/710177042490064958/f6177ea17f6da9318d83b5f5d4579bc4.png?size=48) | [Toating Bot](https://discord.com/api/oauth2/authorize?client_id=710177042490064958&permissions=4063624560&scope=bot%20applications.commands) |
| ![](https://cdn.discordapp.com/emojis/848060200417493053.gif?size=48) | [Savage Bot](https://discord.com/oauth2/authorize?client_id=823703707522433054&permissions=8&scope=bot%20applications.commands) |
