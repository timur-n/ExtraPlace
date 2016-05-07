describe('Scrapers', function() {

    afterEach(function() {
        $('body').empty();
    });

    describe('Smarkets', function() {
        it('should scrape horse page', function() {
        });
    });

    describe('Inject', function() {
        describe('lib', function() {
            it('should create lib', function() {
                expect(window.bb).toBeDefined();
            });

            it('should normalize Correct Score values', function() {
                expect(window.bb.normalizeCorrectScore('QPR 2-0', 'QPR', 'Fullham')).toBe('2 - 0');
                expect(window.bb.normalizeCorrectScore('Fullham 2-0', 'QPR', 'Fullham')).toBe('0 - 2');
                expect(window.bb.normalizeCorrectScore('Draw 1-1', 'QPR', 'Fullham')).toBe('1 - 1');
                expect(window.bb.normalizeCorrectScore('QPR 5-1', 'QPR', 'Fullham')).toBe('');
                expect(window.bb.normalizeCorrectScore('Fullham 1-5', 'QPR', 'Fullham')).toBe('');
                expect(window.bb.normalizeCorrectScore('Draw 5-5', 'QPR', 'Fullham')).toBe('');

                var name = 'Manchester Utd 2-1'.replace(/Manchester Utd/gi, 'Man Utd');
                expect(window.bb.normalizeCorrectScore(name, 'home', 'Man Utd')).toBe('1 - 2');
            });
        });
    });

    describe('Oddschecker', function() {
        it('should scrape page', function() {
            var html =
                '<div id="container">' +
                '<div class="nav-popout selected">Leicester<ul><li>...</li></ul></div>' + // mock element
                '<div class="event"><ul><li class="selected"><a>14:45</a></li></ul></div>' + // mock element
                // this is real HTML copied from oddschecker.com
                '<table class="eventTable " data-mid="2577944606" data-mname="Winner" data-sname="Leicester 14:45" data-time="2015-11-16 14:45:00" data-ename="Leicester" data-sport-name="Horse Racing" data-emap="/horse-racing/2015-11-16-leicester/" data-in-play="false" data-cgname="horse racing"><thead>' +
                '<tr class="eventTableHeader"><td style="display: none;"></td><td style="display: none;"></td><td><img alt="Card" src="http://static.oddschecker.com/OC/i/OC/tables/odds_card.gif" width="17" height="37" onclick="' +
                'ts_resortTab(2);" class="resort img_button"></td><td><img alt="form" src="http://static.oddschecker.com/OC/i/OC/tables/odds_form.gif" width="17" height="37" onclick="ts_resortTab(3);" class="resort img_button"></td><td class="allOddsSortHeader"><div class="form-and-betting-link jump-scroll button btn-1-small">View Form &amp; Analysis<span class="arrow"></span></div><div class="aOSHC"><a class="sort-participant" href="javascript:void(0)" onclick="s_objectID=&quot;javascript:void(0)_7&quot;;return this.s_oc?this.s_oc(e):true"><span>Sort By:</span>    <span class="aOSHCBtn0 selected">Fav</span>/<span class="aOSHCBtn1">Name</span>  </a></div></td><td data-bk="B3"><aside><a class="bB390 bk-logo-click" data-bk="B3" data-track="&amp;lid=BookieLogo-B3&amp;lpos=oddsTable" title="Bet 365" href="javascript:void(0);" onclick="s_objectID=&quot;javascript:void(0);_4&quot;;return this.s_oc?this.s_oc(e):true"></a></aside></td><td data-bk="SK"><aside><a class="bSK90 bk-logo-click" data-bk="SK" data-track="&amp;lid=BookieLogo-SK&amp;lpos=oddsTable" title="Sky Bet" href="javascript:void(0);" onclick="s_objectID=&quot;javascript:void(0);_5&quot;;return this.s_oc?this.s_oc(e):true"></a></aside></td><td data-bk="BX"><aside><a class="bBX90 bk-logo-click" data-bk="BX" data-track="&amp;lid=BookieLogo-BX&amp;lpos=oddsTable" title="Totesport" href="javascript:void(0);" onclick="s_objectID=&quot;javascript:void(0);_6&quot;;return this.s_oc?this.s_oc(e):true"></a></aside></td><td data-bk="BY"><aside><a class="bBY90 bk-logo-click" data-bk="BY" data-track="&amp;lid=BookieLogo-BY&amp;lpos=oddsTable" title="Boylesports" href="javascript:void(0);" onclick="s_objectID=&quot;javascript:void(0);_7&quot;;return this.s_oc?this.s_oc(e):true"></a></aside></td><td data-bk="FR"><aside><a class="bFR90 bk-logo-click" data-bk="FR" data-track="&amp;li' +
                'd=BookieLogo-FR&amp;lpos=oddsTable" title="Betfred" href="javascript:void(0);" onclick="s_objectID=&quot;javascript:void(0);_8&quot;;return this.s_oc?this.s_oc(e):true"></a></aside></td><td data-bk="SO"><aside><a class="bSO90 bk-logo-click" data-bk="SO" data-track="&amp;lid=BookieLogo-SO&amp;lpos=oddsTable" title="Sportingbet" href="javascript:void(0);" onclick="s_objectID=&quot;javascript:void(0);_9&quot;;return this.s_oc?this.s_oc(e):true"></a></aside></td><td data-bk="VC"><aside><a class="bVC90 bk-logo-click" data-bk="VC" data-track="&amp;lid=BookieLogo-VC&amp;lpos=oddsTable" title="Bet Victor" href="javascript:void(0);" onclick="s_objectID=&quot;javascript:void(0);_10&quot;;return this.s_oc?this.s_oc(e):true"></a></aside></td><td data-bk="PP"><aside><a class="bPP90 bk-logo-click" data-bk="PP" data-track="&amp;lid=BookieLogo-PP&amp;lpos=oddsTable" title="Paddy Power" href="javascript:void(0);" onclick="s_objectID=&quot;javascript:void(0);_11&quot;;return this.s_oc?this.s_oc(e):true"></a></aside></td><td d' +
                'ata-bk="SJ"><aside><a class="bSJ90 bk-logo-click" data-bk="SJ" data-track="&amp;lid=BookieLogo-SJ&amp;lpos=oddsTable" title="Stan James" href="javascript:void(0);" onclick="s_objectID=&quot;javascript:void(0);_12&quot;;return this.s_oc?this.s_oc(e):true"></a></aside></td><td data-bk="EE"><aside><a class="bEE90 bk-logo-click" data-bk="EE" data-track="&amp;lid=BookieLogo-EE&amp;lpos=oddsTable" title="888sport" href="javascript:void(0);" onclick="s_objectID=&quot;javascript:void(0);_13&quot;;return this.s_oc?this.s_oc(e):true"></a></aside></td><td data-bk="LD"><aside><a class="bLD90 bk-logo-click" data-bk="LD" data-track="&amp;lid=BookieLogo-LD&amp;lpos=oddsTable" title="Ladbrokes" href="javascript:void(0);" onclick="s_objectID=&quot;javascript:void(0);_14&quot;;return this.s_oc?this.s_oc(e):true"></a></aside></td><td data-bk="CE"><aside><a class="bCE90 bk-logo-click" data-bk="CE" data-track="&amp;lid=BookieLogo-CE&amp;lpos=oddsTable" title="Coral" href="javascript:void(0);" onclick="s_objectID=&quot;javascript' +
                ':void(0);_15&quot;;return this.s_oc?this.s_oc(e):true"></a></aside></td><td data-bk="WH"><aside><a class="bWH90 bk-logo-click" data-bk="WH" data-track="&amp;lid=BookieLogo-WH&amp;lpos=oddsTable" title="William Hill" href="javascript:void(0);" onclick="s_objectID=&quot;javascript:void(0);_16&quot;;return this.s_oc?this.s_oc(e):true"></a></aside></td><td data-bk="WN"><aside><a class="bWN90 bk-logo-click" data-bk="WN" data-track="&amp;lid=BookieLogo-WN&amp;lpos=oddsTable" title="Winner" href="javascript:void(0);" onclick="s_objectID=&quot;javascript:void(0);_17&quot;;return this.s_oc?this.s_oc(e):true"></a></aside></td><td data-bk="FB"><aside><a class="bFB90 bk-logo-click" data-bk="FB" data-track="&amp;lid=BookieLogo-FB&amp;lpos=oddsTable" title="Betfair Sportsbook" href="javascript:void(0);" onclick="s_objectID=&quot;javascript:void(0);_18&quot;;return this.s_oc?this.s_oc(e):true"></a></aside></td><td data-bk="WA"><aside><a class="bWA90 bk-logo-click" data-bk="WA" data-track="&amp;lid=BookieLogo-WA&amp;lpos=oddsTable" title="Betway" href="javascript:void(0);" onclick="s_objectID=&quot;javascript:void(0);_19&quot;;return this.s_oc?this.s_oc(e):true"></a></aside></td><td data-bk="BB"><aside><a class="bBB90 bk-logo-click" data-bk="BB" data-track="&amp;lid=BookieLogo-BB&amp;lpos=oddsTable" title="BetBright" href="javascript:void(0);" onclick="s_objectID=&quot;javascript:void(0);_20&quot;;return this.s_oc?this.s_oc(e):true"></a></aside></td><td data-bk="TI"><aside><a class="bTI90 bk-logo-click" data-bk="TI" data-track="&amp;lid=BookieLogo-TI&amp;lpos=oddsTable" title="Titan Bet" href="javascript:void(0);" onclick="s_objectID=&quot;javascript:void(0);_21&quot;;return this.s_oc?this.s_oc(e):true"></a></aside></td><td data-bk="RB"><aside><a class="bRB90 bk-logo-click" data-bk="RB" data-track="&amp;lid=BookieLogo-RB&amp;lpos=oddsTable" title="RaceBets" href="javascript:void(0);" onclick="s_objectID=&quot;javascript:void(0);_22&quot;;return this.s_oc?this.s_oc(e):true"></a></aside></td><td data-bk="RD"><aside><a class="bRD90 bk-logo-click" data-bk="RD" data-track="&amp;lid=BookieLogo-RD&amp;lpos=oddsTable" title="32Red Bet" href="javascript:void(0);" onclick="s_objectID=&quot;javascript:void(0);_23&quot;;return this.s_oc?this.s_oc(e):true"></a></aside></td><td data-bk="OE"><aside><a class="bOE90 bk-logo-click" data-bk="OE" data-track="&amp;lid=BookieLogo-OE&amp;lpos=oddsTable" title="10Bet" href="javascript:void(0);" onclick="s_objectID=&quot;javascript:void(0);_24&quot;;return this.s_oc?this.s_oc(e):true"></a></aside></td><td data-bk="MR"><aside><a class="bMR90 bk-logo-click" data-bk="MR" data-track="&amp;lid=BookieLogo-MR&amp;lpos=oddsTable" title="Marathon Bet" href="javascript:void(0);" onclick="s_objectID=&quot;javascript:void(0);_25&quot;;return this.s_oc?this.s_oc(e):true"></a></aside></td><td class="wo wo-col"></td><td data-bk="BF"><aside><a class="bBF90 bk-logo-click" data-bk="BF" data-track="&amp;lid=BookieLogo-BF&amp;lpos=oddsTable" title="Betfair" href="javascript:void(0);" onclick="s_objectID=&quot;javascript:void(0);_26&quot;;return this.s_oc?this.s_oc(e):true"></a></aside></td><td data-bk="BD"><aside><a class="bBD90 bk-logo-click" data-bk="BD" data-track="&amp;lid=BookieLogo-BD&amp;lpos=oddsTable" title="Betdaq" href="javascript:void(0);" onclick="s_objectID=&quot;javascript:void(0);_27&quot;;return this.s_oc?this.s_oc(e):true"></a></aside></td></tr><tr><td style="display: none;"></td><td style="display: none;"></td><td class="eTblLineAo" colspan="3"></td><td class="eTblLineAo" colspan="25"></td></tr></thead><tbody id="t1"><tr class="eventTableRow bgc" data-bid="16350506075" data-best-dig="1.8" data-bname="Stephanie Frances" data-best-bks="B3,VC,PP,LD,CE,WH,OE,BF"><td style="display: none;" id="16350506075_best">1.8</td><td style="display: none;" id="16350506075_name">stephanie frances</td><td>4</td><td><a href="http://www.sportinglife.com/racing/profiles/horse/773330/stephanie-frances" data-track="&amp;lid=form&amp;lpos=stephanie-frances" target="_blank"' +
                '"onclick="s_objectID=&quot;http://www.sportinglife.com/racing/profiles/horse/773330/stephanie-frances_1&quot;;return this.s_oc?this.s_oc(e):true">2811-82</a></td><td class="sel nm"><span title="Add Stephanie Frances to bet basket" data-name="Stephanie Frances" class="add-to-bet-basket" data-ng-click="MainController.addToMultipleBetSlip(16350506075, 2577944606, 1.8)"></span><a class="popup graph-icon" target="_blank" title="View bet history for Stephanie Frances" href="http://www.oddschecker.com/horse-racing/2015-11-16-leicester/14:45/winner/bet-history/stephanie-frances/today" data-name="Stephanie Frances" onclick="s_objectID=&quot;http://www.oddschecker.com/horse-racing/2015-11-16-leicester/14:45/winner/bet-history/stephanie-f_1&quot;;return this.s_oc?this.s_oc(e):true"></a><img alt="Stephanie Frances silk" src="http://static.oddschecker.com/content/racing-silks/333090.gif" width="26" height="19" class="silks"><a class="popup selTxt" target="_blank" title="View bet history for Stephanie Frances" href="http://www.oddschecker.com/horse-racing/2015-11-16-leicester/14:45/winner/bet-history/stephanie-frances/today" data-name="Stephanie Frances" onclick="s_objectID=&quot;http://www.oddschecker.com/horse-racing/2015-11-16-leicester/14:45/winner/bet-history/stephanie-f_2&quot;;return this.s_oc?this.s_oc(e):true">Stephanie Frances</a></td><td class="o co bgc b co" data-odig="1.8" data-o="4/5" data-hcap="">1.8</td><td class="oi co bgc co" data-odig="1.73" data-o="8/11" data-hcap="">1.73</td><td class="o co bgc co" data-odig="1.73" data-o="8/11" data-hcap="">1.73</td><td class="o bgc co" data-odig="0" data-o="SP" data-hcap="">SP</td><td class="o co bgc co" data-odig="1.73" data-o="8/11" data-hcap="">1.73</td><td class="o bgc co" data-odig="0" data-o="SP" data-hcap="">SP</td><td class="oi co bgc b co" data-odig="1.8" data-o="4/5" data-hcap="">1.8</td><td class="o co bgc b co" data-odig="1.8" data-o="4/5" data-hcap="">1.8</td><td class="o bgc co" data-odig="0" data-o="SP" data-hcap="">SP</td><td class="o bgc co" data-odig="0" data-o="SP" data-hcap="">SP</td><td class="oi co bgc b co" data-odig="1.8" data-o="4/5" data-hcap="">1.8</td><td class="o co bgc b co" data-odig="1.8" data-o="4/5" data-hcap="">1.8</td><td class="o co bgc b co" data-odig="1.8" data-o="4/5" data-hcap="">1.8</td><td class="o bgc co" data-odig="0" data-o="SP" data-hcap="">SP</td><td class="o co bgc co" data-odig="1.72" data-o="8/11" data-hcap="">1.72</td><td class="o bgc co" data-odig="0" data-o="SP" data-hcap="">SP</td><td class="o co bgc co" data-odig="1.73" data-o="8/11" data-hcap="">1.73</td><td class="o bgc co" data-odig="0" data-o="SP" data-hcap="">SP</td><td class="o bgc co" data-odig="0" data-o="SP" data-hcap="">SP</td><td class="o bgc co" data-odig="0" data-o="SP" data-hcap="">SP</td><td class="o co bgc b co" data-odig="1.8" data-o="4/5" data-hcap="">1.8</td><td class="o bgc co" data-odig="0" data-o="SP" data-hcap="">SP</td><td class="wo wo-col"></td><td class="oo co  bgc co b" data-odig="1.89" data-o="5/6" data-hcap="" data-x-selection="7306083*1.121842212">1.89</td><td class="oo bgc co" data-odig="1.76" data-o="8/11" data-hcap="">1.76</td></tr><tr class="eventTableRow bgc" data-bid="16350505793" data-best-dig="4.0" data-bname="Red Spinner" data-best-bks="SK,VC,LD,WH,BF"><td style="display: none;" id="16350505793_best">4</td><td style="display: none;" id="16350505793_name">red spinner</td><td>3</td><td><a href="http://www.sportinglife.com/racing/profiles/horse/821089/red-spinner" data-track="&amp;lid=form&amp;lpos=red-spinner" target="_blank" onclick="s_objectID=&quot;http://www.sportinglife.com/racing/profiles/horse/821089/red-spinner_1&quot;;return this.s_oc?this.s_oc(e):true">617211-</a></td><td class="sel nm"><span title="Add Red Spinner to bet basket" data-name="Red Spinner" class="add-to-bet-basket" data-ng-click="MainController.addToMultipleBetSlip(16350505793, 2577944606, 4.0)"></span><a class="popup graph-icon" target="_blank" title="View bet history for Red Spinner" href="http://www.oddschecker.com/horse-racing/2015-11-16-leicester/14:45/winner/bet-history/red-spinner/today" data-name="Red Spinner" onclick="s_objectID=&quot;http://www.oddschecker.com/horse-racing/2015-11-16-leicester/14:45/winner/bet-history/red-spinner_1&quot;;return this.s_oc?this.s_oc(e):true"></a><img alt="Red Spinner silk" src="http://static.oddschecker.com/content/racing-silks/293622.gif" width="26" height="19" class="silks"><a class="popup selTxt" target="_blank" title="View bet history for Red Spinner" href="http://www.oddschecker.com/horse-racing/2015-11-16-leicester/14:45/winner/bet-history/red-spinner/today" data-name="Red Spinner" onclick="s_objectID=&quot;http://www.oddschecker.com/horse-racing/2015-11-16-leicester/14:45/winner/bet-history/red-spinner_2&quot;;return this.s_oc?this.s_oc(e):true">Red Spinner</a></td><td class="o co bgc co" data-odig="3.75" data-o="11/4" data-hcap="">3.75</td><td class="o co bgc b co" data-odig="4" data-o="3" data-hcap="">4</td><td class="o co bgc co" data-odig="3.75" data-o="11/4" data-hcap="">3.75</td><td class="o bgc co" data-odig="0" data-o="SP" data-hcap="">SP</td><td class="o co bgc co" data-odig="3.75" data-o="11/4" data-hcap="">3.75</td><td class="o bgc co" data-odig="0" data-o="SP" data-hcap="">SP</td><td class="o co bgc b co" data-odig="4" data-o="3" data-hcap="">4</td><td class="o co bgc co" data-odig="3.75" data-o="11/4" data-hcap="">3.75</td><td class="o bgc co" data-odig="0" data-o="SP" data-hcap="">SP</td><td class="o bgc co" data-odig="0" data-o="SP" data-hcap="">SP</td><td class="o co bgc b co" data-odig="4" data-o="3" data-hcap="">4</td><td class="o co bgc co" data-odig="3.75" data-o="11/4" data-hcap="">3.75</td><td class="o co bgc b co" data-odig="4" data-o="3" data-hcap="">4</td><td class="o bgc co" data-odig="0" data-o="SP" data-hcap="">SP</td><td class="oi co bgc co" data-odig="3.75" data-o="11/4" data-hcap="">3.75</td><td class="o bgc co" data-odig="0" data-o="SP" data-hcap="">SP</td><td class="o co bgc co" data-odig="3.75" data-o="11/4" data-hcap="">3.75</td><td class="o bgc co" data-odig="0" data-o="SP" data-hcap="">SP</td><td class="o bgc co" data-odig="0" data-o="SP" data-hcap="">SP</td><td class="o bgc co" data-odig="0" data-o="SP" data-hcap="">SP</td><td class="o co bgc co" data-odig="3.75" data-o="11/4" data-hcap="">3.75</td><td class="o bgc co" data-odig="0" data-o="SP" data-hcap="">SP</td><td class="wo wo-col"></td><td class="oo co  bgc co b" data-odig="4.51" data-o="7/2" data-hcap="" data-x-selection="8519800*1.121842212">4.51</td><td class="oo bgc co" data-odig="4.01" data-o="3" data-hcap="">4.01</td></tr><tr class="eventTableRow bgc" data-bid="16350506039" data-best-dig="5.0" data-bname="Pine Creek" data-best-bks="B3,BX,FR,WH,OE"><td style="display: none;" id="16350506039_best">5</td><td style="display: none;" id="16350506039_name">pine creek</td><td>2</td><td><a href="http://www.sportinglife.com/racing/profiles/horse/910788/pine-creek" data-track="&amp;lid=form&amp;lpos=pine-creek" target="_blank" onclick="s_objectID=&quot;http://www.sportinglife.com/racing/profiles/horse/910788/pine-creek_1&quot;;return this.s_oc?this.s_oc(e):true">67/520-6</a></td><td class="sel nm"><span title="Add Pine Creek to bet basket" data-name="Pine Creek" class="add-to-bet-basket" data-ng-click="MainController.addToMultipleBetSlip(16350506039, 2577944606, 5.0)"></span><a class="popup graph-icon" target="_blank" title="View bet history for Pine Creek" href="http://www.oddschecker.com/horse-racing/2015-11-16-leicester/14:45/winner/bet-history/pine-creek/today" data-name="Pine Creek" onclick="s_objectID=&quot;http://www.oddschecker.com/horse-racing/2015-11-16-leicester/14:45/winner/bet-history/pine-creek/_1&quot;;return this.s_oc?this.s_oc(e):true"></a><img alt="Pine Creek silk" src="http://static.oddschecker.com/content/racing-silks/230927.gif" width="26" height="19" class="silks"><a class="popup selTxt" target="_blank" title="View bet history for Pine Creek" href="http://www.oddschecker.com/horse-racing/2015-11-16-leicester/14:45/winner/bet-history/pine-creek/today" data-name="Pine Creek" onclick="s_objectID=&quot;http://www.oddschecker.com/horse-racing/2015-11-16-leicester/14:45/winner/bet-history/pine-creek/_2&quot;;return this.s_oc?this.s_oc(e):true">Pine Creek</a></td><td class="o co bgc b co" data-odig="5" data-o="4" data-hcap="">5</td><td class="o co bgc co" data-odig="4.5" data-o="7/2" data-hcap="">4.5</td><td class="o co bgc b co" data-odig="5" data-o="4" data-hcap="">5</td><td class="o bgc co" data-odig="0" data-o="SP" data-hcap="">SP</td><td class="o co bgc b co" data-odig="5" data-o="4" data-hcap="">5</td><td class="o bgc co" data-odig="0" data-o="SP" data-hcap="">SP</td><td class="oi co bgc co" data-odig="4.5" data-o="7/2" data-hcap="">4.5</td><td class="o co bgc co" data-odig="4.5" data-o="7/2" data-hcap="">4.5</td><td class="o bgc co" data-odig="0" data-o="SP" data-hcap="">SP</td><td class="o bgc co" data-odig="0" data-o="SP" data-hcap="">SP</td><td class="o co bgc co" data-odig="4" data-o="3" data-hcap="">4</td><td class="o co bgc co" data-odig="4.5" data-o="7/2" data-hcap="">4.5</td><td class="o co bgc b co" data-odig="5" data-o="4" data-hcap="">5</td><td class="o bgc co" data-odig="0" data-o="SP" data-hcap="">SP</td><td class="o co bgc co" data-odig="4.5" data-o="7/2" data-hcap="">4.5</td><td class="o bgc co" data-odig="0" data-o="SP" data-hcap="">SP</td><td class="o co bgc co" data-odig="4.5" data-o="7/2" data-hcap="">4.5</td><td class="o bgc co" data-odig="0" data-o="SP" data-hcap="">SP</td><td class="o bgc co" data-odig="0" data-o="SP" data-hcap="">SP</td><td class="o bgc co" data-odig="0" data-o="SP" data-hcap="">SP</td><td class="o co bgc b co" data-odig="5" data-o="4" data-hcap="">5</td><td class="o bgc co" data-odig="0" data-o="SP" data-hcap="">SP</td><td class="wo wo-col"></td><td class="oo co bgc co" data-odig="4.42" data-o="10/3" data-hcap="" data-x-selection="5040953*1.121842212">4.42</td><td class="oo bgc co" data-odig="4.3" data-o="3" data-hcap="">4.3</td></tr><tr class="eventTableRow bgc" data-bid="16350505733" data-best-dig="17.0" data-bname="Exitas" data-best-bks="VC,LD,BB"><td style="display: none;" id="16350505733_best">17</td><td style="display: none;" id="16350505733_name">exitas</td><td>1</td><td><a href="http://www.sportinglife.com/racing/profiles/horse/752685/exitas" data-track="&amp;lid=form&amp;lpos=exitas" target="_blank" onclick="s_objectID=&quot;http://www.sportinglife.com/racing/profiles/horse/752685/exitas_1&quot;;return this.s_oc?this.s_oc(e):true">11160-P</a></td><td class="sel nm"><span title="Add Exitas to bet basket" data-name="Exitas" class="add-to-bet-basket" data-ng-click="MainController.addToMultipleBetSlip(16350505733, 2577944606, 17.0)"></span><a class="popup graph-icon" target="_blank" title="View bet history for Exitas" href="http://www.oddschecker.com/horse-racing/2015-11-16-leicester/14:45/winner/bet-history/exitas/today" data-name="Exitas" onclick="s_objectID=&quot;http://www.oddschecker.com/horse-racing/2015-11-16-leicester/14:45/winner/bet-history/exitas/toda_1&quot;;return this.s_oc?this.s_oc(e):true"></a><img alt="Exitas silk" src="http://static.oddschecker.com/content/racing-silks/17042.gif" width="26" height="19" class="silks"><a class="popup selTxt" target="_blank" title="View bet history for Exitas" href="http://www.oddschecker.com/horse-racing/2015-11-16-leicester/14:45/winner/bet-history/exitas/today" data-name="Exitas" onclick="s_objectID=&quot;http://www.oddschecker.com/horse-racing/2015-11-16-leicester/14:45/winner/bet-history/exitas/toda_2&quot;;return this.s_oc?this.s_oc(e):true">Exitas</a></td><td class="o co bgc co" data-odig="15" data-o="14" data-hcap="">15</td><td class="o co bgc co" data-odig="15" data-o="14" data-hcap="">15</td><td class="o co bgc co" data-odig="15" data-o="14" data-hcap="">15</td><td class="o bgc co" data-odig="0" data-o="SP" data-hcap="">SP</td><td class="o co bgc co" data-odig="15" data-o="14" data-hcap="">15</td><td class="o bgc co" data-odig="0" data-o="SP" data-hcap="">SP</td><td class="o co bgc b co" data-odig="17" data-o="16" data-hcap="">17</td><td class="o co bgc co" data-odig="15" data-o="14" data-hcap="">15</td><td class="o bgc co" data-odig="0" data-o="SP" data-hcap="">SP</td><td class="o bgc co" data-odig="0" data-o="SP" data-hcap="">SP</td><td class="o co bgc b co" data-odig="17" data-o="16" data-hcap="">17</td><td class="o co bgc co" data-odig="15" data-o="14" data-hcap="">15</td><td class="o co bgc co" data-odig="15" data-o="14" data-hcap="">15</td><td class="o bgc co" data-odig="0" data-o="SP" data-hcap="">SP</td><td class="oi co bgc co" data-odig="13" data-o="12" data-hcap="">13</td><td class="o bgc co" data-odig="0" data-o="SP" data-hcap="">SP</td><td class="o co bgc b co" data-odig="17" data-o="16" data-hcap="">17</td><td class="o bgc co" data-odig="0" data-o="SP" data-hcap="">SP</td><td class="o bgc co" data-odig="0" data-o="SP" data-hcap="">SP</td><td class="o bgc co" data-odig="0" data-o="SP" data-hcap="">SP</td><td class="o co bgc co" data-odig="15" data-o="14" data-hcap="">15</td><td class="o bgc co" data-odig="0" data-o="SP" data-hcap="">SP</td><td class="wo wo-col"></td><td class="oo co bgc co" data-odig="12.4" data-o="57/5" data-hcap="" data-x-selection="7017728*1.121842212">12.4</td><td class="oo bgc co" data-odig="11.2" data-o="51/5" data-hcap="">11.2</td></tr></tbody><tfoot><tr><td style="display: none;"></td><td style="display: none;"></td><td class="eTblLineAo" colspan="3"></td><td class="eTblLineAo" colspan="25"></td></tr><tr class="eventTableFooter racingEventTableFooter"><td style="display: none;"></td><td style="display: none;"></td><td colspan="28" class="ewt-empty"><div id="footer-left"><span class="footerNonRun"><span class="footerNonRunText">Non-Runners: 0/4</span></span><span class="footerBestBook">Best Book: 106%</span></div><div id="footer-right"><p id="text-disclaimer">Odds shown come direct from online bookmakers. Please <br>check all aspects of your bets before placement. <a href="/help/faq/accuracy-of-the-odds" onclick="s_objectID=&quot;http://www.oddschecker.com/help/faq/accuracy-of-the-odds_1&quot;;return this.s_oc?this.s_oc(e):true">More info »' +
                '</a></p><aside><div id="table-key"><div id="settings-table" class="module"><div id="table-info-bar" class="settings-container"><p class="title best-odds-description">The Best Odds Are <span class="title best-odds">Bold</span></p><span class="shortening"><span class="title">Odds Shortening</span><span class="box">Odds Shortening</span></span><span class="drifting"><span class="title">Odds Drifting</span><span class="box">Odds Drifting</span></span><a class="my-bookie-button button btn-2-small" href="https://www.oddschecker.com/myoddschecker/bookmakers" onclick="s_objectID=&quot;https://www.oddschecker.com/myoddschecker/bookmakers_2&quot;;return this.s_oc?this.s_oc(e):true">My Bookies<span class="arrow"></span></a></div></div></div></aside></div></td></tr></tfoot></table>' +
                '</div>';
            $('body').append($(html));

            var result = {};
            window.bb_getOddschekerHorse(result);
            expect(result.event).toBeDefined();
            expect(result.event.name).toBe('Leicester');
            expect(result.event.time).toBe('14:45');
            expect(result.bookies).toBeDefined();
            expect(result.bookies.length).toBe(24);
            var bookie = result.bookies[0];
            expect(bookie.name).toBe('Bet 365');
            expect(bookie.markets).toBeDefined();
            expect(bookie.markets.length).toBe(1);
            var market = bookie.markets[0];
            expect(market.name).toBe('Win');
            expect(market.runners).toBeDefined();
            expect(market.runners.length).toBe(4);
            var runner = market.runners[0];
            expect(runner.name).toBe('Stephanie Frances');
            expect(runner.price).toBe('1.8');
            runner = market.runners[1];
            expect(runner.name).toBe('Red Spinner');
            expect(runner.price).toBe('3.75');
            runner = market.runners[2];
            expect(runner.name).toBe('Pine Creek');
            expect(runner.price).toBe('5');
            runner = market.runners[3];
            expect(runner.name).toBe('Exitas');
            expect(runner.price).toBe('15');
        });
    });

    describe('Willhill', function() {
        it('should scrape page', function() {
            // todo-timur: add runners html and tests
            var html =
                '<div id="contentHead"><h2>Real Madrid v Roma - All Markets</h2><span id="eventDetailsHeader"><span>Bet until : 08 Mar  -19:45 UK</span></span></div>' +
                '<div id="primaryCollectionContainer">' +
                    '<div id="ip_market_1"><span id="ip_market_name_1">Match Betting</span></div>' +
                '</div>';
            $('body').append($(html));

            var result = window.bb_getWillhill();
            expect(result.event).toBeDefined();
            expect(result.event.name).toBe('Real Madrid v Roma');
            expect(result.event.time).toBe('19:45');
            expect(result.bookies).toBeDefined();
            expect(result.bookies.length).toBe(1);
            var bookie = result.bookies[0];
            expect(bookie.name).toBe('William Hill');
            expect(bookie.markets).toBeDefined();
            expect(bookie.markets.length).toBe(1);
            var market = bookie.markets[0];
            expect(market.name).toBe('Match Odds');
            expect(market.runners).toBeDefined();
/*
            expect(market.runners.length).toBe(4);
            var runner = market.runners[0];
            expect(runner.name).toBe('Stephanie Frances');
            expect(runner.price).toBe('1.8');
            runner = market.runners[1];
            expect(runner.name).toBe('Red Spinner');
            expect(runner.price).toBe('3.75');
            runner = market.runners[2];
            expect(runner.name).toBe('Pine Creek');
            expect(runner.price).toBe('5');
            runner = market.runners[3];
            expect(runner.name).toBe('Exitas');
            expect(runner.price).toBe('15');
*/
        });
    });

    describe('Bet Victor', function() {
        it('should scrape football page', function() {
            var html = '<div id="center_content">' +
                '<div class="coupon_header scrollable">' +
                    '<div class="coupon_header_titles">' +
                        '<h4><span class="localized-time"><em>Saturday</em>12:45</span></h4>' +
                        '<h1>West Ham v Sunderland</h1>' +
                    '</div>' +
                '</div>' +
                '<div class="single_markets">' +
                    '<h4><span class="coupon-title single">ENG Premier League - Match Betting - 90 Mins</span><span>Junk1</span></h4>' +
                    '<table class="full_list">' +
                        '<tr class="body">' +
                            '<td class="outcome_td"><span class="out_come bet" data-outcome_description="Runner11"><a><span class="outcome_description">Runner11</span><span class="price">19/10</span></a></span></td>' +
                            '<td class="outcome_td"><span class="out_come bet" data-outcome_description="Runner12"><a><span class="outcome_description">Runner12</span><span class="price">5/4</span></a></span></td>' +
                        '</tr>' +
                    '</table>' +
                '</div>' +
                '<div class="single_markets">' +
                    '<h4><span class="coupon-title single">Correct Score - 90 Mins</span><span>Junk2</span></h4>' +
                    '<table class="full_list">' +
                        '<tr class="body">' +
                            '<td class="outcome_td"><span class="out_come bet" data-outcome_description="West Ham 1 - 0"><a><span class="outcome_description">Runner21</span><span class="price">11/1</span></a></span></td>' +
                            '<td class="outcome_td"><span class="out_come bet" data-outcome_description="Draw 0 - 0"><a><span class="outcome_description">Runner22</span><span class="price">15/1</span></a></span></td>' +
                            '<td class="outcome_td"><span class="out_come bet" data-outcome_description="Sunderland 1 - 0"><a><span class="outcome_description">Runner23</span><span class="price">10/4</span></a></span></td>' +
                        '</tr>' +
                    '</table>' +
                '</div>' +
            '</div>';
            $('body').append($(html));

            var result = window.bb_getBetvictorFootball();
            expect(result.event).toBeDefined();
            expect(result.event.name).toBe('West Ham v Sunderland');
            expect(result.event.time).toBe('12:45');

            expect(result.bookies.length).toBe(1);
            var bookie = result.bookies[0];
            expect(bookie.markets.length).toBe(2);
            var mkt = bookie.markets[0];
            expect(mkt.name).toBe('Match Odds');
            expect(mkt.runners.length).toBe(2);
            var runner = mkt.runners[0];
            expect(runner.name).toBe('Runner11');
            expect(runner.price).toBe('19/10');
            runner = mkt.runners[1];
            expect(runner.name).toBe('Runner12');
            expect(runner.price).toBe('5/4');

            mkt = bookie.markets[1];
            expect(mkt.name).toBe('Correct Score');
            expect(mkt.runners.length).toBe(3);
            runner = mkt.runners[0];
            expect(runner.name).toBe('1 - 0');
            expect(runner.price).toBe('11/1');
            runner = mkt.runners[1];
            expect(runner.name).toBe('0 - 0');
            expect(runner.price).toBe('15/1');
            runner = mkt.runners[2];
            expect(runner.name).toBe('0 - 1');
            expect(runner.price).toBe('10/4');
        });
        it('should scrape football page', function() {
            var html = '<div id="center_content">' +
                '<div class="coupon_header scrollable">' +
                    '<div class="coupon_header_titles">' +
                        '<h4><span class="localized-time"><em>Saturday</em>12:45</span></h4>' +
                        '<h1>\nStoke City v Aston Villa\n</h1>' +
                    '</div>' +
                '</div>' +
            '</div>';
            $('body').append($(html));

            var result = window.bb_getBetvictorFootball();
            expect(result.debug).toBeDefined();
            expect(result.debug.home).toBe('Stoke City');
            expect(result.debug.away).toBe('Aston Villa');
        });
    });
});