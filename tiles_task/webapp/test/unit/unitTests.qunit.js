/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"tiles_task/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
