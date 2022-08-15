# customizable-discordjs-pagination
<p>
   <a href="https://www.npmjs.com/package/customizable-discordjs-pagination"><img src="https://nodei.co/npm/customizable-discordjs-pagination.png?downloadRank=true&downloads=true&downloadRank=true&stars=true" /></a>  <a href="https://discord.gg/ju8kxnvnCw"><img src="https://discordapp.com/api/guilds/748607784735604857/widget.png?style=banner2" alt="Discord Banner2"/></a>
</p>
This package features a fully customizable embed pagination for DiscordJS V13 and V14. The User can modify the buttons to their liking and enable/disable Select Menu.

## Install package
```sh
npm install customizable-discordjs-pagination
```

## Discord.js v13 Example
```js
const Pagination = require('customizable-discordjs-pagination');

// Make Embeds using DiscordJS package
const pages = [embed1, embed2, embed3];

const buttons = [
   { label: 'Previous', emoji: '⬅', style: 'DANGER' },
   { label: 'Next', emoji: '➡', style: 'SUCCESS' }
];

new Pagination()
   .setCommand(message)
   .setPages(pages)
   .setButtons(buttons)
   .setPaginationCollector({ timeout: 120000 })
   .setSelectMenu({ enable: true })
   .setFooter({ enable: true })
   .send();
```
## Discord.js v14 Example
```js   
const Pagination = require('customizable-discordjs-pagination');
const { ButtonStyle } = require('discord.js'); // Discord.js v14+

// Make Embeds using DiscordJS package
const pages = [embed1, embed2, embed3];

const buttons = [
   { label: 'Previous', emoji: '⬅', style: ButtonStyle.Danger },
   { label: 'Next', emoji: '➡', style: ButtonStyle.Success },
]

new Pagination()
   .setCommand(message)
   .setPages(pages)
   .setButtons(buttons)
   .setPaginationCollector({ timeout: 120000 })
   .setSelectMenu({ enable: true })
   .setFooter({ enable: true })
   .send();
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
new Pagination()
   .setCommand(message)
   .setPages(pages)
   .setButtons(buttons)
   .setPaginationCollector({ timeout: 120000 })
   .setSelectMenu({ enable: true })
   .setFooter({ enable: true })
   .send();
```

## Methods
| Name | Optional  | Details |
| --- | --- | ---  |
| setCommand(message / interaction) | ❌ | Message or Slash Interaction Accepted | 
| setPages(pages) | ❌ | Array of MessageEmbeds(DiscordJS V13) or EmbedBuilder(DiscordJS V14) |
| send() | ❌ | Executes the pagination | 
| setButtons([{ parameters }, { parameters }, ...]) | ✔️ | Array of objects containing styles, labels and/or emojis for the buttons |
| setPaginationCollector({ parameters }) | ✔️ | Optional Method to set Select Menu Options | 
| setSelectMenu({ parameters }) | ✔️ | Optional Method to set Collector Options | 
| setFooter({ parameters }) | ✔️ | Optional Method to set Footer Options |

## Optional Methods
### setButtons([{ parameters }, { parameters }, ...])
Default: An Empty Array ( [] )

| Parameter | Type | Details |
| --- | --- | --- |
| label | String | The text to be displayed on this button |
| emoji | [Emoji](https://discord.js.org/#/docs/discord.js/13.8.0/typedef/EmojiIdentifierResolvable) | The emoji to be displayed on this button |
| style | [ButtonStyle](https://discord.js.org/#/docs/discord.js/13.8.0/typedef/MessageButtonStyle) | The style of this button |

### setFooter({ parameters })
Defaults:
- {User Tag} - message.member.user.tag || interaction.member.user.tag
- {User Avatar} - message.author.displayAvatarURL({ dynamic: true }) || interaction.user.displayAvatarURL({ dynamic: true })

| Parameter | Type | Default | Details |
| --- | --- | --- | --- |
| option | Sting | 'default' | 'user' - Uses the User's Embed Footer; 'none' - Remove Embed Footer; 'default': The Package Default Footer with parameters modifications(Below) |
| pagePosition | String | 'left' | Adjust the pagePosition to the left, right or none. |
| extraText | String | 'Requested by {User Tag}' | The user can customize this text to be displayed on the footer |
| enableIconURL | Boolean | true | Set tp false to disable Footer Icon(Image) |
| iconURL | String | {User Avatar} | The icon URL of the footer |

### setSelectMenu({ parameters })

| Parameter | Type | Default | Details |
| --- | --- | --- | --- |
| enable | Boolean | false | Set to true to enable Select Menu |
| placeholder | String | 'Select Page' | The text to be displayed as placeholder for the Select Menu |
| pageOnly | Boolean | false | True: Forced Select Menu Options is page numbers; False: Select Menu Options is the Embed Title(if different), otherwise page numbers |

### setPaginationCollector({ parameters })

| Parameter | Type | Default | Details |
| --- | --- | --- | --- |
| components | String | 'disable' | Options: 'disable' - Disables the components at the end ; 'disappear' - Remove the components at the end |
| ephemeral | Boolean | false | Set to true to make the Pagination Collector ephemeral |
| resetTimer | Boolean | true | Set to true to reset the Pagination Collector timer |
| secondaryUserInteraction | Boolean | false | Set to true to allow secondary user interaction |
| secondaryUserText | String | 'Select Page' | The text to be displayed for the secondary user |
| timeout | Number | 120000 | The time in milliseconds before the Pagination Collector times out |

## Bots that use this package
| Avatar | Name |
| --- | --- |
| ![](https://cdn.discordapp.com/avatars/710177042490064958/f6177ea17f6da9318d83b5f5d4579bc4.png?size=48) | [Toating Bot](https://discord.com/api/oauth2/authorize?client_id=710177042490064958&permissions=4063624560&scope=bot%20applications.commands) |
| ![](https://cdn.discordapp.com/emojis/848060200417493053.gif?size=48) | [Savage Bot](https://discord.com/oauth2/authorize?client_id=823703707522433054&permissions=8&scope=bot%20applications.commands) |
