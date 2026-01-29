class LivingTerminal {
    constructor(containerId) {
        this.outerContainer = document.getElementById(containerId);

        // Create inner content container if not exists
        if (!this.outerContainer.querySelector('.terminal-content')) {
            this.container = document.createElement('div');
            this.container.className = 'terminal-content';
            this.outerContainer.appendChild(this.container);
        } else {
            this.container = this.outerContainer.querySelector('.terminal-content');
        }

        this.output = '';
        this.currentLine = '';
        this.cursorVisible = true;
        this.isTyping = false;

        // Start cursor blink
        setInterval(() => {
            this.cursorVisible = !this.cursorVisible;
            this.render();
        }, 500);

        // Start the boot sequence
        this.startBoot();
    }

    render() {
        const cursor = this.cursorVisible ? '█' : ' ';
        this.container.innerHTML = this.output + this.currentLine + cursor;
        this.container.scrollTop = this.container.scrollHeight;
    }

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async typeLine(text, speed = 30, color = null) {
        this.isTyping = true;
        const colorStart = color ? `<span style="color: ${color}">` : '';
        const colorEnd = color ? '</span>' : '';

        for (let char of text) {
            this.currentLine += char;
            this.render();
            await this.sleep(speed);
        }

        this.output += colorStart + this.currentLine + colorEnd + '\n';
        this.currentLine = '';
        this.isTyping = false;
        this.render();
    }

    async printLine(text, color = null) {
        const colorStart = color ? `<span style="color: ${color}">` : '';
        const colorEnd = color ? '</span>' : '';
        this.output += colorStart + text + colorEnd + '\n';
        this.render();
        await this.sleep(50);
    }

    clear() {
        this.output = '';
        this.currentLine = '';
        this.render();
    }

    async startBoot() {
        // Phase 1: Linux Boot
        await this.sleep(500);
        await this.typeLine('[    0.000000] Linux version 5.15.0-ozmenos (ozmen@pc)', 15, '#FFFFFF');
        await this.typeLine('[    0.000001] Command line: BOOT_IMAGE=/boot/vmlinuz root=/dev/sda1', 10, '#AAAAAA');
        await this.sleep(200);

        await this.printLine('[    0.234156] DMI: OZMENOS/1.0, BIOS 2001.09.19', '#FFFFFF');
        await this.printLine('[    0.445829] Memory: 4096MB RAM', '#FFFFFF');
        await this.printLine('[    1.023456] CPU: Intel Core i7 (ozmen build)', '#FFFFFF');
        await this.sleep(300);

        await this.printLine('[    1.567234] Detecting hardware...', '#FFFFFF');
        await this.printLine('[    1.789012] eth0: Link detected - muhammetozmen.org', '#00FF00');
        await this.printLine('[    1.901234] Mounting /dev/sda1 on /home/ozmen', '#00FF00');
        await this.printLine('[    2.012345] Loading user profile: Muhammet Özmen', '#00FF00');
        await this.sleep(400);

        await this.printLine('[    2.234567] System locale: tr_TR.UTF-8 (Mardin, Türkiye)', '#FFFFFF');
        await this.printLine('[    2.456789] Birthdate detected: 2001-09-19', '#FFFF00');
        await this.printLine('[    2.678901] Occupation: Computer Engineer', '#00FF00');
        await this.sleep(600);

        // Phase 2: OZMENOS Logo
        await this.printLine('');
        await this.printLine('');
        await this.printLine('   ____ ________  ___ _____ _   _  ____  _____', '#00FF41');
        await this.printLine('  / __ \\__  /   |/  /| ____| \\ | |/ __ \\/ ____|', '#00FF41');
        await this.printLine(' | |  | |/ /| |\\/| | |  _| |  \\| | |  | | (___ ', '#00FF41');
        await this.printLine(' | |__| / /_| |  | | | |___| . ` | |__| |\\___ \\ ', '#00FF41');
        await this.printLine('  \\____/____|_|  |_| |_____|_|\\__|\\____/_____/ ', '#00FF41');
        await this.printLine('');
        await this.typeLine('═══════════════════════════════════════════', 10, '#00FFFF');
        await this.typeLine('    Personal Terminal of Muhammet Özmen', 40, '#FFFFFF');
        await this.typeLine('    aka "karitha" // Computer Engineer', 40, '#AAAAAA');
        await this.typeLine('    Status: ONLINE @ muhammetozmen.org', 40, '#00FF00');
        await this.typeLine('═══════════════════════════════════════════', 10, '#00FFFF');
        await this.sleep(2000);

        // Phase 3: Start infinite session loop
        this.infiniteSession();
    }

    async infiniteSession() {
        const commands = [
            {
                cmd: 'ls -la ~/',
                output: [
                    'total 42',
                    'drwxr-xr-x  8 ozmen ozmen 4096 Jan 28 18:19 .',
                    'drwxr-xr-x  3 root  root  4096 Sep 19 2001 ..',
                    '-rw-r--r--  1 ozmen ozmen  220 Jan 28 2026 .bash_profile',
                    '-rw-r--r--  1 ozmen ozmen 3.5K Jan 28 2026 .bashrc',
                    'drwxr-xr-x  2 ozmen ozmen 4096 Jan 28 2026 projects',
                    '-rw-r--r--  1 ozmen ozmen 1337 Sep 19 2001 birthdate.txt',
                    'drwxr-xr-x  3 ozmen ozmen 4096 Jan 28 2026 blog',
                    '-rwxr-xr-x  1 ozmen ozmen 2001 Sep 19 2001 engineer.sh'
                ]
            },
            {
                cmd: 'cat /etc/passwd | grep ozmen',
                output: [
                    'ozmen:x:1000:1000:Muhammet Özmen,Mardin,TR:/home/ozmen:/bin/bash'
                ]
            },
            {
                cmd: 'whoami && hostname',
                output: [
                    'ozmen',
                    'ozmenos.muhammetozmen.org'
                ]
            },
            {
                cmd: 'cat ~/.profile',
                output: [
                    '# Personal Profile for Muhammet Özmen',
                    '# Gaming alias: karitha',
                    '# Location: Mardin, Türkiye',
                    '# Born: September 19, 2001',
                    '',
                    'export NAME="Muhammet Özmen"',
                    'export OCCUPATION="Computer Engineer"',
                    'export DOMAIN="muhammetozmen.org"',
                    'export GAMING_TAG="karitha"',
                    '',
                    'echo "Welcome back, $NAME"'
                ]
            },
            {
                cmd: 'uptime',
                output: [
                    ' 18:19:01 up 8401 days, 23:59,  1 user,  load average: 0.42, 0.19, 0.09'
                ]
            },
            {
                cmd: 'cat mission.log',
                output: [
                    '=== MISSION LOG: ozmen@ozmenos ===',
                    '',
                    'Date: 2026-01-28',
                    'User: Muhammet Özmen (aka karitha)',
                    'Status: Building digital presence',
                    '',
                    'The network never sleeps.',
                    'I am here.',
                    '',
                    '--- END TRANSMISSION ---'
                ]
            }
        ];

        let commandIndex = 0;

        while (true) {
            await this.sleep(1000);
            await this.printLine('');

            const prompt = 'ozmen@ozmenos:~$';
            const command = commands[commandIndex];

            // Type command
            await this.typeLine(prompt + ' ' + command.cmd, 50, '#00FF00');
            await this.sleep(400);

            // Show output
            for (let line of command.output) {
                await this.printLine(line, '#FFFFFF');
                await this.sleep(100);
            }

            await this.sleep(2500);

            // Move to next command
            commandIndex = (commandIndex + 1) % commands.length;

            // Occasional clear to prevent infinite scroll
            if (commandIndex === 0) {
                await this.sleep(1000);
                await this.typeLine('clear', 40, '#00FF00');
                await this.sleep(500);
                this.clear();
            }
        }
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('living-terminal');
    if (terminal) {
        new LivingTerminal('living-terminal');
    }
});
