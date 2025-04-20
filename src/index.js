const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

Array.prototype.contains = function(obj)
{
    var i = this.length;
	
    while (i--)
	{
        if (this[i] === obj)
		{
            return true;
        }
    }
	
    return false;
}

process.stdout.write(String.fromCharCode(27) + "]0;" + "WAMindFlayer | Made by https://github.com/GabryB03/" + String.fromCharCode(7));

const client = new Client
({
	puppeteer:
	{
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
		executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
	}
});

client.on('qr', (qr) =>
{
    qrcode.generate(qr, {small: true});
});

client.on('ready', () =>
{
	try
	{
		console.log("Process started, please wait a while for finishing.");
		const times = parseInt(fs.readFileSync('src/_times.txt', 'utf8'));
		const message = fs.readFileSync('src/_message.txt', 'utf8');
		const numbers = fs.readFileSync('src/_numbers.txt', 'utf8');
		const numbersList = numbers.split('\r\n');
		var realNumbersList = [];
		
		for (var i = 0; i < numbersList.length; i++)
		{
			var theNumber = numbersList[i];
			theNumber = theNumber.replaceAll(" ", "").replaceAll("+", "").replaceAll('\t', "");
			
			if (theNumber != "" && !numbersList.contains(theNumber) && client.isRegisteredUser(theNumber))
			{
				realNumbersList.push(theNumber);
			}
		}
		
		if (realNumbersList.length == 0)
		{
			console.log("Numbers list is empty.");
			return;
		}
		else if (message == "")
		{
			console.log("Message is empty.");
			return;
		}
		
		for (var i = 0; i < realNumbersList.length; i++)
		{
			var theNumber = realNumbersList[i];
			
			for (var j = 0; j < times; j++)
			{
				try
				{
					client.sendMessage(theNumber + "@c.us", message);
				}
				catch (error)
				{
					
				}
			}
		}
		
		console.log("All the work is done.");
	}
	catch (err)
	{
		console.log("Execution failed.");
	}
});

client.initialize();