# MH Discord command categories handler

This command handler uses Discord.js, and supports categories of commands.
It isn't finished yet, so you can contribute as you want.

## Summary

- [1) Usage](#1-usage)
	- [Configuration](#configuration)
	- [Creating commands](#creating-commands)
	- [Creating categories](#creating-categories)
    - [Updating the help command](#updating-the-help-command)

## 1) Usage

### Configuration

"./config.json", you should understand it easily

### Creating commands

Just create a file "name_of_your_command.js" in the "./commands" directory.
Then to configure it, type
```JavaScript
module.exports.run = async (client, args, message) => {
    // In this block, the behavior of your command.
};

module.exports.conf = {
    elevation: 0 // for everyone, 10 for only you. You can configure more elevations in the "./structures/elevationManager.js" file.
}
```

### Creating categories

Same, but put your files in a subdirectory in "./commands".

### Updating the help command

When you create a category, you have to modify the "./commands/help.js" file.
In the switch function line 21, just add the name of your category, and the corresponding emoji, following the examples.
