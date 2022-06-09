# customizable-discordjs-pagination
<p>
   <a href="https://www.npmjs.com/package/customizable-discordjs-pagination"><img src="https://nodei.co/npm/customizable-discordjs-pagination.png?downloadRank=true&downloads=true&downloadRank=true&stars=true" /></a>
      <br/>
   <a href="https://discord.gg/ju8kxnvnCw"><img src="https://discordapp.com/api/guilds/[SERVER ID]/widget.png?style=banner2" /></a>
</p>
This package features a fully customizable embed pagination for DiscordJS V13 and V14. The User can modify the buttons to their liking and enable/disable Select Menu.
To Install: `npm i customizable-discordjs-pagination`

## Example
```js
const Pagination = require('customizable-discordjs-pagination');

const pages = [embed1, embed2, embed3, ...];
const timeout = 120000;
const slashMenu = true;
// DiscordJS V13
const buttons = [
{ label: 'Previous', emoji: '⬅', style: 'DANGER'},
{ label: 'Next', emoji: '➡', style: 'SUCCESS'},
]

Pagination.V13Pagination(Discord, message, pages, buttons, timeout, slashMenu);

// DiscordJS V14
const buttons = [
{ label: 'Previous', emoji: '⬅', style: Discord.ButtonStyle.Danger},
{label: 'Next', emoji: '➡', style: Discord.ButtonStyle.Success},
]

Pagination.V13Pagination(Discord, message, pages, buttons, timeout, slashMenu);
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
- For V13: Use ```V13Pagination(Discord, message, pages, buttons, timeout, slashMenu)```
- For V14: Use ```V14Pagination(Discord, message, pages, buttons, timeout, slashMenu)```

### Parameters
| Name | Optional | Details |
| --- | --- | --- |
| Discord | ❌ |  Pass the Discord package to be accessible in the function | 
| Message |  ❌ | Message or Slash Interaction Accepted| 
| Pages |  ❌ | Array of MessageEmbeds/ButtonBuilder(Pages) |  
| ButtonList | ✔️ | Array of objects containing styles, labels and/or emojis for the buttons | C
| Timeout | ✔️ |Timeout in Milliseconds (Default: 120000 ms)| C
| SelectMenu | ✔️ |Boolean value for SelectMenu  (Page Limit: 25)| 

### ButtonList
ButtonList should be an Array of objects.
| Parameter | Type | Details |
| --- | --- | --- |
| label | String | The text to be displayed on this button |
| emoji | [String](https://discord.js.org/#/docs/discord.js/13.8.0/typedef/EmojiIdentifierResolvable) | The emoji to be displayed on this button |
| style | [String](https://discord.js.org/#/docs/discord.js/13.8.0/typedef/MessageButtonStyleResolvable) | The style of this button |

## Bots that use this package
- [Toating Bot](https://discord.com/api/oauth2/authorize?client_id=710177042490064958&permissions=4063624560&scope=bot%20applications.commands)
