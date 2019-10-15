/**
 * @name: MxComplex插件
 * @author: pls
 * @update: 2019-4-18
 * @descript:
 * 插件为maytef的组件插件
 * 插件
 *
 */
;(function ($) {
    var typeTrans = {
        "text": "textbox",
        "number": "numberbox",
        "date": "datebox",
        "datetime": "datetimebox",
        "time": "clockTimePicker",
        "combobox": "maytekFcombobox",
        "selectInput": "mxSelectInput",
        "numberVerify": "createVerify"
    };
    //创建插件对象
    $.fn.mxComplex = function (arg1, arg2) {
        if (typeof arg1 == "string") {
            var method = $.fn.mxComplex.methods[arg1];
            if (method) {
                return method(this, arg2);
            } else {
                console.log("mxComplex没有这个方法");
                return;
            }
        }
        var params = arg1 || {};
        return this.each(function () {
            //获取数据
            var data = $.data(this, "mxComplex");
            if (data) {
                //把params合并到data.options上
                $.extend(data.options, params);
            } else {
                data = $.data(this, "mxComplex", {
                    options: $.extend({}, params),
                    data: []
                });
            }
            //渲染数据
            render(this, data);
        })
    };

    $.fn.mxComplex.methods = {
        options: function (jq) {
        },
        getData: function (jq) {
            return $.data(jq[0], "mxComplex").data;
        },
        getValue: function (jq) {
            return getValue(jq[0]);
        },
        getText: function (jq) {
            return getText(jq[0]);
        },
        setValue: function (jq, param) {
            return jq.each(function () {
                setValue(this, param);
            });
        },
        setText: function (jq, text) {
            return jq.each(function () {
                setText(this, text);
            });
        }
    };


    function render(el, d) {
        //绑定元素数据
        var bind = $.data(el, "mxComplex");
        bind.data = d.options;
        //创建dom元素
        var dom = "";
        $.each(bind.data, function (key, data) {
            data.mxkey = el.id + "_" + data.mxkey;
            if (!data.options) {
                data.options = {};
            }
            var width = data.width || '100%';
            var _pdr = data.paddingRight || 0;

            if (typeof width == "number") width += "px";
            if (typeof _pdr == "number") _pdr += 'px';

            switch (data.type) {
                case "text":
                    dom += '<div style="width:' + width + ';padding-right: ' + _pdr + '"><input type="text" id="' + data.mxkey + '" complexKey="' + data.mxkey + '" complexType="' + data.type + '" ></div>';
                    break
                case "number":
                    dom += '<div style="width:' + width + ';padding-right: ' + _pdr + '"><input type="text" id="' + data.mxkey + '" complexKey="' + data.mxkey + '" complexType="' + data.type + '" ></div>';
                    break
                case "date":
                    dom += '<div style="width:' + width + ';padding-right: ' + _pdr + '"><input type="text" id="' + data.mxkey + '" complexKey="' + data.mxkey + '" complexType="' + data.type + '" ></div>';
                    break
                case "datetime":
                    dom += '<div style="width:' + width + ';padding-right: ' + _pdr + '"><input type="text" id="' + data.mxkey + '" complexKey="' + data.mxkey + '" complexType="' + data.type + '" ></div>';
                    break
                case "time":
                    dom += '<div style="width:' + width + ';padding-right: ' + _pdr + '"><input type="text" id="' + data.mxkey + '" complexKey="' + data.mxkey + '" complexType="' + data.type + '" ></div>';
                    break
                case "combobox":
                    dom += '<div style="width:' + width + ';padding-right: ' + _pdr + '"><div id="' + data.mxkey + '" complexKey="' + data.mxkey + '" complexType="' + data.type + '"  type="combobox" style="height: 40px"></div></div>';
                    ;
                    break
                case 'selectInput':
                    dom += '<div style="width:' + width + ';padding-right: ' + _pdr + '"><div id="' + data.mxkey + '" complexKey="' + data.mxkey + '" complexType="' + data.type + '"  type="selectInput"></div></div>';
                    break;
                case 'numberVerify':
                    dom += '<div style="width:' + width + ';padding-right: ' + _pdr + '"><div id="' + data.mxkey + '"  complexKey="' + data.mxkey + '" complexType="' + data.type + '" enable="' + data.options.enable + '"></div></div>';
                    break;
                case 'custom':
                    dom += '<div style="width:' + width + ';padding-right: ' + _pdr + '"><div id="' + data.mxkey + '"  complexKey="' + data.mxkey + '" complexType="' + data.type + '" >' + data.html + '</div></div>';
                    break;
            }
        });

        $("#" + el.id).append(dom);
        //渲染dom元素
        $.each(bind.data, function (key, data) {
            var options = data.options;
            var com_height = 38;
            options.width = "100%";
            switch (data.type) {
                case "text":
                    options.height = com_height;
                    options.icons = [{
                        iconCls: 'iconfont icon-clear',
                        handler: function (e) {
                            $(e.data.target).textbox('setValue', '');
                        }
                    }];
                    $("#" + data.mxkey).textbox(options);
                    break
                case "number":
                    options.height = com_height;
                    options.icons = [{
                        iconCls: 'iconfont icon-clear',
                        handler: function (e) {
                            $(e.data.target).textbox('setValue', '');
                        }
                    }];
                    $("#" + data.mxkey).numberbox(options);
                    break
                case "date":
                    options.height = com_height;
                    $("#" + data.mxkey).datebox(options);
                    break
                case "datetime":
                    options.height = com_height;
                    $("#" + data.mxkey).datetimebox(options);
                    break
                case "time":
                    options.value && $("#" + data.mxkey + " input").val(options.value);
                    $("#" + data.mxkey).clockTimePicker(options);
                    break
                case "combobox":
                    $("#" + data.mxkey).maytekFcombobox(options);
                    break
                case 'selectInput':
                    $("#" + data.mxkey).mxSelectInput('init', options);
                    break;
                case 'numberVerify':
                    options.id = data.mxkey;
                    createVerify(options);
                    break;
                case 'custom':
                    break;
            }
        });

    }

    function getValue(el) {
        var result = {};
        var data = $("#" + el.id).mxComplex("getData");
        for (var key in data) {
            var value = "";
            if (data[key].type == "custom") {
                continue
            }
            if (data[key].type == "time") {
                value = $("#" + data[key].mxkey).val();
                result[data[key].mxkey] = value;
                continue
            }

            if (data[key].type == "numberVerify") {
                value = numberVerifyObj[data[key].mxkey].getResult();
                result[data[key].mxkey] = value;
                continue
            }

            value = $("#" + data[key].mxkey)[typeTrans[data[key].type]]("getValue");
            result[data[key].mxkey] = value;

        }
        ;
        return result
    }

    function getText(el) {
        var result = {};
        var data = $("#" + el.id).mxComplex("getData");
        for (var key in data) {
            var text = "";
            if (data[key].type == "custom") {
                continue
            }
            if (data[key].type == "time") {
                value = $("#" + data[key].mxkey).val();
                result[data[key].mxkey] = value;
                continue
            }
            if (data[key].type == "numberVerify") {
                text = numberVerifyObj[data[key].mxkey].getResult();
                result[data[key].mxkey] = text;
                continue
            }

            text = $("#" + data[key].mxkey)[typeTrans[data[key].type]]("getText");
            result[data[key].mxkey] = text;

        }
        ;
        return result
    }

    function setValue(el, param) {
        var data = $("#" + el.id).mxComplex("getData");
        var clear = false;
        //清空值
        if (param == "") {
            clear = true;
            param = data;
        }
        for (var key in param) {
            var text = param[key];
            //清空
            if (clear) {
                text = "";
            }
            for (var d in data) {
                if (key == d) {
                    if (data[d].type == "custom") {
                        continue
                    }
                    if (data[d].type == "time") {
                        $("#" + data[key].mxkey).val(text);
                        continue
                    }
                    if (data[d].type == "numberVerify") {
                        // createVerify({id:data[key].mxkey}).getResult();
                        continue
                    }
                    $("#" + data[key].mxkey)[typeTrans[data[d].type]]("setValue", text);
                }
            }
        }
    }

    function setText(el, param) {
        var data = $("#" + el.id).mxComplex("getData");
        for (var key in param) {
            var value = param[key];
            for (var d in data) {
                if (key == d) {
                    if (data[d].type == "custom") {
                        continue
                    }
                    if (data[d].type == "numberVerify") {
                        // createVerify({id:data[key].mxkey}).getResult();
                        continue
                    }
                    $("#" + data[key].mxkey)[typeTrans[data[d].type]]("setText", value);
                }
            }
        }
    }
})(jQuery)
