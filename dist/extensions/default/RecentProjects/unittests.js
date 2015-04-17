define(function(require,exports,module){"use strict";var SpecRunnerUtils=brackets.getModule("spec/SpecRunnerUtils"),FileUtils=brackets.getModule("file/FileUtils"),KeyEvent=brackets.getModule("utils/KeyEvent"),_=brackets.getModule("thirdparty/lodash");describe("Recent Projects",function(){var extensionPath=FileUtils.getNativeModuleDirectoryPath(module),testWindow,$,CommandManager,PreferencesManager;beforeFirst(function(){runs(function(){SpecRunnerUtils.createTestWindowAndRun(this,function(w){testWindow=w;$=testWindow.$;CommandManager=testWindow.brackets.test.CommandManager;PreferencesManager=testWindow.brackets.test.PreferencesManager})})});afterLast(function(){testWindow=null;SpecRunnerUtils.closeTestWindow()});function openRecentProjectDropDown(){CommandManager.execute("recentProjects.toggle");waitsFor(function(){return $("#project-dropdown").is(":visible")})}function setupRecentProjectsSpy(howManyProjects){spyOn(PreferencesManager,"getViewState").andCallFake(function(prefId){if(prefId==="recentProjects"){return _.map(_.range(1,howManyProjects+1),function(num){return extensionPath+"/Test-Project-"+num})}else{return[]}})}describe("UI",function(){it("should open the recent projects list with only the getting started project",function(){runs(function(){openRecentProjectDropDown()});runs(function(){var $dropDown=$("#project-dropdown");expect($dropDown.children().length).toEqual(1)})});it("should open the recent project list and show 5 recent projects",function(){setupRecentProjectsSpy(5);runs(function(){openRecentProjectDropDown()});runs(function(){var $dropDown=$("#project-dropdown");expect($dropDown.find(".recent-folder-link").length).toEqual(5)})});it("should delete one project from recent project list when delete key is pressed on",function(){setupRecentProjectsSpy(5);runs(function(){openRecentProjectDropDown()});runs(function(){var $dropDown=$("#project-dropdown");SpecRunnerUtils.simulateKeyEvent(KeyEvent.DOM_VK_DOWN,"keydown",$dropDown[0]);SpecRunnerUtils.simulateKeyEvent(KeyEvent.DOM_VK_DELETE,"keydown",$dropDown[0])});runs(function(){var $dropDown=$("#project-dropdown");expect($dropDown.find(".recent-folder-link").length).toEqual(4)})})})})});