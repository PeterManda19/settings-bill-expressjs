import { assert } from 'chai';
import { equal, deepEqual } from 'assert';
import SettingsBill from '../settings-bill.js';

describe('settings-bill', function(){

    const settingsBill = SettingsBill();

    it('should be able to record calls', function(){
        settingsBill.recordAction('call');
        equal(1, settingsBill.actionsFor('call').length);
    });

    it('should be able to set the settings', function(){
        settingsBill.setSettings({
            smsCost: 2.35,
            callCost: 3.35,
            warningLevel: 30,
            criticalLevel: 40
        });

        deepEqual({
            smsCost: 2.35,
            callCost: 3.35,
            warningLevel: 30,
            criticalLevel: 40
        }, settingsBill.getSettings())


    });

    it('should calculate the right totals', function(){
        const settingsBill = SettingsBill();
        settingsBill.setSettings({
            smsCost: 2.35,
            callCost: 3.35,
            warningLevel: 30,
            criticalLevel: 40
        });

        settingsBill.recordAction('call');
        settingsBill.recordAction('sms');

        equal(2.35, settingsBill.totals().smsTotal);
        equal(3.35, settingsBill.totals().callTotal);
        equal(5.70, settingsBill.totals().grandTotal);

    });

    it('should calculate the right totals for multiple actions', function(){
        const settingsBill = SettingsBill();
        settingsBill.setSettings({
            smsCost: 2.35,
            callCost: 3.35,
            warningLevel: 30,
            criticalLevel: 40
        });

        settingsBill.recordAction('call');
        settingsBill.recordAction('call');
        settingsBill.recordAction('sms');
        settingsBill.recordAction('sms');

        equal(4.70, settingsBill.totals().smsTotal);
        equal(6.70, settingsBill.totals().callTotal);
        equal(11.40, settingsBill.totals().grandTotal);

    });

    it('should know when warning level reached', function(){
        const settingsBill = SettingsBill();
        settingsBill.setSettings({
            smsCost: 2.50,
            callCost: 5.00,
            warningLevel: 5,
            criticalLevel: 10
        });

        settingsBill.recordAction('call');
        settingsBill.recordAction('sms');

        equal(true, settingsBill.hasReachedWarningLevel());
    });

    it('should know when critical level reached', function(){
        const settingsBill = SettingsBill();
        settingsBill.setSettings({
            smsCost: 2.50,
            callCost: 5.00,
            warningLevel: 5,
            criticalLevel: 10
        });

        settingsBill.recordAction('call');
        settingsBill.recordAction('call');
        settingsBill.recordAction('sms');

        equal(true, settingsBill.hasReachedCriticalLevel());

    });

    // Test case for the reset function
    it('should reset all settings and actionList to zero', function() {
        const settingsBill = SettingsBill();

        settingsBill.setSettings({
            smsCost: 2,
            callCost: 3,
            warningLevel: 10,
            criticalLevel: 20
        });

        settingsBill.recordAction('sms');
        settingsBill.recordAction('call');

        settingsBill.reset();

        const settings = settingsBill.getSettings();
        const actions = settingsBill.actions();

        assert.equal(settings.smsCost, 0);
        assert.equal(settings.callCost, 0);
        assert.equal(settings.warningLevel, 0);
        assert.equal(settings.criticalLevel, 0);
        assert.deepEqual(actions, []);
    });


});