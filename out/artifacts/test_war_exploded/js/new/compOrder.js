
/* eslint-disable */
// ie8 forEach
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function forEach(callback, thisArg) {
        var T, k
        if (this == null) {
            throw new TypeError('this is null or not defined')
        }
        var O = Object(this)
        var len = O.length >>> 0
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function')
        }
        if (arguments.length > 1) {
            T = thisArg
        }
        k = 0
        while (k < len) {
            var kValue
            if (k in O) {
                kValue = O[k]
                callback.call(T, kValue, k, O)
            }
            k++
        }
    }
}
// ie8 indexOf -> bootstrap-datetimepicker.js
// Add ECMA262-5 Array methods if not supported natively (IE8)
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(searchElement, fromIndex) {
        var k
        if (this == null) {
            throw new TypeError('"this" is null or not defined')
        }
        var o = Object(this)
        var len = o.length >>> 0
        if (len === 0) {
            return -1
        }
        var n = fromIndex | 0
        if (n >= len) {
            return -1
        }
        k = Math.max(n >= 0 ? n : len - Math.abs(n), 0)
        while (k < len) {
            if (k in o && o[k] === searchElement) {
                return k
            }
            k++
        }
        return -1
    }
}
/* IEVersion
值	值类型	值说明
-1	Number	 不是ie浏览器
6	Number	ie版本<=6
7	Number	ie7
8	Number	ie8
9	Number	ie9
10	Number	ie10
11	Number	ie11
'edge'	String	ie的edge浏览器
*/
function IEVersion() {
    var userAgent = navigator.userAgent //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 //判断是否IE<11浏览器
    var isEdge = userAgent.indexOf('Edge') > -1 && !isIE //判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
    if (isIE) {
        var reIE = new RegExp('MSIE (\\d+\\.\\d+);')
        reIE.test(userAgent)
        var fIEVersion = parseFloat(RegExp['$1'])
        if (fIEVersion == 7) {
            return 7
        } else if (fIEVersion == 8) {
            return 8
        } else if (fIEVersion == 9) {
            return 9
        } else if (fIEVersion == 10) {
            return 10
        } else {
            return 6 //IE版本<=7
        }
    } else if (isEdge) {
        return 'edge' //edge
    } else if (isIE11) {
        return 11 //IE11
    } else {
        return -1 //不是ie浏览器
    }
}
var rulesData = {
    rule9: /^1(3|4|5|6|7|8|9)\d{9}$/, //手机号：首位1，次位3、4、5、6、7、8、9（2020年无1、2号段），剩余九位[0-9]。
    rule8: /^(\d{3,4}-)?\d{7,8}$/, //座机号：三或四位数字-七或八位数字，其中区号可以没有。
    rule6: /^(([1-9][0-9]*)|0)$/, //积分：整数
    rule5: /^(([1-9][0-9]{0,5})|0)\.[0-9]{2}$/, //金额：不超过6位整数位和两位小数
    rule4: /^(([1-9][0-9]{0,6})|0)\.[0-9]$/, //金额：不超过7位整数位和一位小数
    rule3: /^(([1-9][0-9]{0,7})|0)$/, //金额：不超过8位正整数
    rule1: /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ //如果为true，字符串含有emoji表情 ，false不含。
}
var codeToName = {
    'p-100': '北京市',
    'p-220': '天津市',
    'p-471': '内蒙古省',
    'p-311': '河北省',
    'p-451': '黑龙江省',
    'p-240': '辽宁省',
    'p-431': '吉林省',
    'p-531': '山东省',
    'p-371': '河南省',
    'p-351': '山西省',
    'p-290': '陕西省',
    'p-931': '甘肃省',
    'p-951': '宁夏省',
    'p-991': '新疆省',
    'p-891': '西藏省',
    'p-871': '云南省',
    'p-280': '四川省',
    'p-230': '重庆市',
    'p-270': '湖北省',
    'p-731': '湖南省',
    'p-250': '江苏省',
    'p-791': '江西省',
    'p-571': '浙江省',
    'p-591': '福建省',
    'p-200': '广东省',
    'p-771': '广西省',
    'p-851': '贵州省',
    'p-210': '上海市',
    'p-898': '海南省',
    'p-551': '安徽省',
    'p-971': '青海省'
}
var provinceName = codeToName['p-' + _provinceCode]
var provInner = []
var provExt = []
var defaultOption = '<option value="">请选择</option>'
var provOption =
    '<option value="省内">' + provinceName + '</option><option value="省外">' + provinceName + '外</option>'
var areaOption = ''
var countryOption = ''
var secondTypeIndex = 0
var isLimited = false
// ie 9 不支持const
var secondProblemTypeList = [
    '费用疑问',
    '充值缴费',
    '积分业务',
    '扣费提醒',
    '服务质量',
    '营销活动质疑',
    '补卡、过户、销户',
    '业务、套餐变更问题',
    '室内/室外无信号',
    '通话时出现断线',
    '上网时出现断线',
    '网速慢或网页无法打开',
    '有信号无法使用'
]
//控制手机营业厅浮层
function ShowDivYYT() {
    $('#yytbar').css('display', 'block')
    $('#sjyyt a.a2_a').addClass('a2_a_h')
}
function HideDivYYT() {
    $('#yytbar').css('display', 'none')
    $('#sjyyt a.a2_a').removeClass('a2_a_h')
}
//展开收起条款
// function openDisclaimers() {
//   $('#disclaimers').css('display', 'block')
// }
// function CloseDisclaimers() {
//   $('#disclaimers').css('display', 'block')
// }
function reSetAddrOpinion() {
    $('#respCityCode option').remove()
    $('#respCityCode').append(defaultOption)
    $('#faultDistrtId option').remove()
    $('#faultDistrtId').append(defaultOption)
}
function getAddrInfo() {
    $.ajax({
        method: 'GET',
        timeout: 1000,
        url: '../../complaint/addrInfo',
        success: function(response) {
            var res = JSON.parse(aesDecrypt(response))
            if (res.returnCode == 0 && res.bean && res.bean.restStatus && res.bean.restStatus.status == 0) {
                provInner = res.bean.data.provInner
                provExt = res.bean.data.provExt
                areaOption = '<option value=' + provExt[0].areaCode + '>' + provExt[0].areaName + '</option>'
                countryOption =
                    '<option value=' + provExt[0].children[0].countryCode + '>' + provExt[0].children[0].countryName + '</option>'
                // provList
                $('#provSelectCode option').remove()
                var provList = defaultOption + provOption
                $('#provSelectCode').append(provList)
                // cityList
                $('#respCityCode option').remove()
                $('#respCityCode').append(defaultOption)
                // countyList
                $('#faultDistrtId option').remove()
                $('#faultDistrtId').append(defaultOption)
            }
        },
        error: function(err) {}
    })
}
function initTimeSelecter() {
    ;[
        'doubtCostTime',
        'rechargeTime',
        'occurTime0',
        'occurTime1',
        'occurTime2',
        'joinTime',
        'occurTime3',
        'occurTime4',
        'failureTime'
    ].forEach(function(item) {
        $('#' + item).datetimepicker({
            format: 'yyyy-mm-dd hh:ii', //显示格式
            language: 'zh-CN', //显示中文
            autoclose: true, //当选择一个日期之后是否立即关闭此日期时间选择器
            weekStart: 1, //0星期天 到 6星期六
            startView: 2, //0 hour, 1 day, 2 month,3 year, 4 decade
            initialDate: new Date(), //初始化当前日期
            endDate: new Date(), //所能选取的截至时间
            todayHighlight: false, //是否高亮当天日期
            keyboardNavigation: true, //是否允许通过方向键改变日期
            forceParse: true //当选择器关闭的时候，是否强制解析输入框中的值
        })
    })
}
function initOtherSelecter() {
    ;[
        'problemType0',
        'doubtCostDetail',
        'problemType1',
        'problemType2',
        'problemType3',
        'problemType4',
        'problemType5',
        'problemType6',
        'problemType7',
        'surroundUserCond'
    ].forEach(function(item) {
        //模拟下拉框
        $('.' + item + '.own-select input').on('click', function() {
            if ($('.' + item + '.own-select .own-list').is('.hide')) {
                $('.' + item + '.own-select .own-list').removeClass('hide')
            } else {
                $('.' + item + '.own-select .own-list').addClass('hide')
            }
        })
        $('.' + item + '.own-select .own-list li').on('click', function() {
            $('.' + item + '.own-select input')
                .val($(this).html())
                .change()
            $('.' + item + '.own-select input').val($(this).html())
            $('.' + item + '.own-select .own-list').addClass('hide')
            // $('.'+item+'.own-select input').css('border-bottom','1px solid $d6d6d6');
        })
    })
    // 联动双济南
    if (_isOpen == 'open') {
        ;['provSelectCode', 'respCityCode', 'faultDistrtId'].forEach(function(item) {
            $('#' + item).change(function() {
                if (item == 'provSelectCode') {
                    if (!$(this).val()) {
                        reSetAddrOpinion()
                    } else if ($(this).val() == '省外') {
                        // 省外
                        $('#respCityCode option').remove()
                        $('#respCityCode').append(areaOption)
                        $('#faultDistrtId option').remove()
                        $('#faultDistrtId').append(countryOption)
                    } else {
                        // cityList
                        $('#respCityCode option').remove()
                        var cityList = defaultOption
                        provInner.forEach(function(obj) {
                            cityList = cityList + '<option value=' + obj.areaCode + '>' + obj.areaName + '</option>'
                        })
                        $('#respCityCode').append(cityList)
                        // countyList
                        $('#faultDistrtId option').remove()
                        $('#faultDistrtId').append(defaultOption)
                    }
                } else if (item == 'respCityCode') {
                    var areaTempCode = $(this).val()
                    if (!areaTempCode) {
                        $('#faultDistrtId option').remove()
                        $('#faultDistrtId').append(defaultOption)
                    } else {
                        // countyList
                        $('#faultDistrtId option').remove()
                        var countyList = defaultOption
                        var i = 0
                        for (; i < provInner.length; i++) {
                            if (provInner[i].areaCode == areaTempCode) break
                        }
                        provInner[i].children.forEach(function(obj) {
                            countyList = countyList + '<option value=' + obj.countryCode + '>' + obj.countryName + '</option>'
                        })
                        $('#faultDistrtId').append(countyList)
                    }
                } else {
                }
            })
        })
    }

    // 模拟动效
    $('.own-select .own-list li').hover(
        function() {
            $(this).css({ backgroundColor: '#e5f9ff', 'font-size': '16px' })
        },
        function() {
            $(this).css({ backgroundColor: '#FFFFFF', 'font-size': '14px' })
        }
    )
    $('.own-select .own-list').hover(
        function() {},
        function() {
            $(this).addClass('hide')
        }
    )
}
// 防抖
function debounce(fn, wait) {
    var timer = null
    return function() {
        if (timer !== null) {
            clearTimeout(timer)
        }
        timer = setTimeout(fn, wait)
    }
}
// 控制提交按钮是否半透明
function initButtonWatch() {
    // input watch
    ;[
        'doubtCostBusiNm',
        'rechargeChannel',
        'batchOrCardNo',
        'busiNm0',
        'beComplainedNoOrAddr',
        'marketDesc',
        'busiNm1',
        'failureLocation',
        'doubtCostAmount',
        'rechargeAmount',
        'abnormalIntegralScore',
        'bizCntt',
        'fstConcTelnum1'
    ].forEach(function(item) {
        // 添加防抖函数
        $('#' + item).on(
            'input',
            debounce(function() {
                var ispassed = checkParams()
                if (ispassed) {
                    $('#btn-submit').removeClass('is-noaccept')
                } else {
                    $('#btn-submit').addClass('is-noaccept')
                }
            }, 500)
        )
    })
    // select watch
    ;[
        // 普通选择类
        'problemType0',
        'doubtCostDetail',
        'problemType1',
        'problemType2',
        'problemType3',
        'problemType4',
        'problemType5',
        'problemType6',
        'problemType7',
        'surroundUserCond',
        // 时间选择类
        'doubtCostTime',
        'rechargeTime',
        'occurTime0',
        'occurTime1',
        'occurTime2',
        'joinTime',
        'occurTime3',
        'occurTime4',
        'failureTime'
    ].forEach(function(item) {
        $('#' + item).on('change', function() {
            var ispassed = checkParams()
            if (ispassed) {
                $('#btn-submit').removeClass('is-noaccept')
            } else {
                $('#btn-submit').addClass('is-noaccept')
            }
        })
    })
    if (_isOpen == 'open') {
        ;['respCityCode', 'faultDistrtId', 'provSelectCode'].forEach(function(item) {
            $('#' + item).on('change', function() {
                var ispassed = checkParams()
                if (ispassed) {
                    $('#btn-submit').removeClass('is-noaccept')
                } else {
                    $('#btn-submit').addClass('is-noaccept')
                }
            })
        })
    }
}
// 异常信息提示
function initOnchange() {
    ;[
        'doubtCostBusiNm',
        'rechargeChannel',
        'batchOrCardNo',
        'busiNm0',
        'beComplainedNoOrAddr',
        'marketDesc',
        'busiNm1',
        'failureLocation'
    ].forEach(function(item) {
        $('#' + item).on('change', function() {
            var v = $(this)
                .val()
                .replace(/^\s+|\s+$/g, '')
            var toastMessage = ''
            if (v.length > 40) {
                toastMessage = '字数上限40'
            } else if (!isAcceptString(v)) {
                toastMessage = '存在特殊字符或表情，请重新输入'
            }
            if (v.length > 0 && toastMessage) {
                $(this)
                    .prev()
                    .html(toastMessage)
                    .removeClass('hide')
            } else {
                $(this)
                    .prev()
                    .html('')
                    .addClass('hide')
            }
        })
        $('#' + item).on('input', function() {
            var v = String($(this).val()).replace(/^\s+|\s+$/g, '')
            if (v.length === 0) {
                $(this)
                    .prev()
                    .html('')
                    .addClass('hide')
            }
        })
    })
    ;['doubtCostAmount', 'rechargeAmount', 'abnormalIntegralScore', 'fstConcTelnum1'].forEach(function(item) {
        $('#' + item).on('change', function() {
            var v = String($(this).val()).replace(/^\s+|\s+$/g, '')
            var toastMessage = ''
            if (['doubtCostAmount', 'rechargeAmount'].indexOf(item) > -1) {
                if (v.length > 9) {
                    toastMessage = '字符上限9'
                } else if (!isAcceptString(v)) {
                    toastMessage = '存在特殊字符或表情，请重新输入'
                } else if (!isAcceptMoney(v)) {
                    toastMessage = '请输入整数或小数点后1-2位'
                }
            } else if (['abnormalIntegralScore'].indexOf(item) > -1) {
                if (v.length > 20) {
                    toastMessage = '字符上限20'
                } else if (!isAcceptString(v)) {
                    toastMessage = '存在特殊字符或表情，请重新输入'
                } else if (!isAcceptScore(v)) {
                    toastMessage = '请输入整数'
                }
            } else if (['bizCntt'].indexOf(item) > -1) {
                if (v.length < 15 || v.length > 400) {
                    toastMessage = '字数上限400，至少15个字'
                } else if (!isAcceptString(v)) {
                    toastMessage = '存在特殊字符或表情，请重新输入'
                }
            } else if (['fstConcTelnum1'].indexOf(item) > -1) {
                if (v.length > 13) {
                    toastMessage = '字符上限13'
                } else if (!isAcceptString(v)) {
                    toastMessage = '存在特殊字符或表情，请重新输入'
                } else if (!isAcceptTel(v)) {
                    toastMessage = '请输入正确的手机号或座机号，座机号格式：区号-座机号、座机号'
                }
            }
            if (v.length > 0 && toastMessage) {
                $(this)
                    .prev()
                    .html(toastMessage)
                    .removeClass('hide')
            } else {
                $(this)
                    .prev()
                    .html('')
                    .addClass('hide')
            }
        })
        $('#' + item).on('input', function() {
            var v = String($(this).val()).replace(/^\s+|\s+$/g, '')
            if (v.length === 0) {
                $(this)
                    .prev()
                    .html('')
                    .addClass('hide')
            }
        })
    })
    // 问题描述
    $('#bizCntt').on('input', function() {
        var v = String($(this).val()).replace(/^\s+|\s+$/g, '')
        var toastMessage = ''
        if (v.length > 400) {
            toastMessage = '已达到字数限制'
        } else if (!isAcceptString(v)) {
            toastMessage = '存在特殊字符或表情，请重新输入'
        }
        if (v.length > 400) {
            $('.textarea-tips').html('<span class="red">' + v.length + '</span>/400')
        } else if (v.length >= 15) {
            $('.textarea-tips').html(v.length + '/400')
        } else if (v.length > 0) {
            $('.textarea-tips').html('（至少输入15个字）<span class="red">' + v.length + '</span>/400')
        } else {
            $('.textarea-tips').html('（至少输入15个字）0/400')
        }
        if (toastMessage) {
            $(this)
                .prev()
                .html(toastMessage)
                .removeClass('hide')
        } else {
            $(this)
                .prev()
                .html('')
                .addClass('hide')
        }
    })
}
// 立单类型选择
function setCreateItem(index) {
    if (isLimited) {
        setLimitText()
        $('#myModal').modal('show')
    }
    $('.reset-value').val('')
    $('.error-tip').addClass('hide')
    $('.textarea-tips').html('（至少输入15个字）0/400')
    $('.flex-1 span').removeClass('active')
    $('.flex-1 span')
        .filter(function(item) {
            return $(this).html() == secondProblemTypeList[index]
        })
        .addClass('active')
    $('.second-type').hide()
    if (index < 8) {
        $('.second-type' + index).show()
    } else {
        $('.second-type8').show()
        reSetAddrOpinion()
    }
    secondTypeIndex = index
}

function isAcceptString(str) {
    return !rulesData.rule1.test(str)
}
function isAcceptMoney(money) {
    return rulesData.rule3.test(money) || rulesData.rule4.test(money) || rulesData.rule5.test(money)
}
function isAcceptScore(score) {
    return rulesData.rule6.test(score)
}
function isAcceptTel(tel) {
    return rulesData.rule8.test(tel) || rulesData.rule9.test(tel)
}
// function isAcceptString(str) {
//     if ('[object String]' != Object.prototype.toString.call(str)) return false;
//     // 判断是否含有特殊符号
//     // var rule1 = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im
//     // 判断是否含有emoji表情
//     var rule2 = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig
//     // 如果为true，字符串含有emoji表情 ，false不含
//     return !rule2.test(str);
// }
// function isAcceptMoney(money) {
//     var rule = new RegExp(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/);
//     return rule.test(money.replace(/^\s+|\s+$/g, ''));
// }
// function isAcceptScore(score) {
//     var rule = new RegExp(/^[1-9]+\d*$/);
//     return rule.test(score.replace(/^\s+|\s+$/g, ''));
// }
// function isAcceptTel(tel) {
//     var rule = new RegExp(/^(((\d{3,4}-)?[0-9]{7,8})|(1(3|4|5|6|7|8|9)\d{9}))$/);
//     return rule.test(tel.replace(/^\s+|\s+$/g, ''));
// }
function setLimitText() {
    $('#myModal .modal-header .logo').attr('src', '../../images/new/comp-order-error@2x.png')
    $('#myModal .modal-body .word').hide()
    $('#myModal .modal-body .title').show()
    $('#myModal .modal-body .limit').show()
}
function requestComplaintCounts() {
    $.ajax({
        method: 'GET',
        timeout: 1000,
        url: '../../complaint/getComplaintCounts',
        success: function(response) {
            var res = JSON.parse(aesDecrypt(response))
            if (res && res.data && res.data.length >= 3) {
                isLimited = true
                setLimitText()
                $('#myModal .modal-body .limit').text(
                    `每位用户7天内在互联网提交投诉数量最多为3次。给您带来不便，敬请谅解！如有疑问可拨打10086热线。`
                )
                $('#myModal').modal('show')
            }
        },
        error: function(err) {}
    })
}
function updateComplaintCounts() {
    $.ajax({
        method: 'GET',
        timeout: 1000,
        url: '../../complaint/complaintCountsSign',
        success: function(res) {},
        error: function(err) {}
    })
}
// 录入项校验
function checkParams() {
    switch (secondTypeIndex) {
        case 0:
            var v1 = $('#doubtCostTime')
                .val()
                .replace(/^\s+|\s+$/g, '')
            var v2 = $('#doubtCostBusiNm')
                .val()
                .replace(/^\s+|\s+$/g, '')
            var v3 = $('#doubtCostAmount')
                .val()
                .replace(/^\s+|\s+$/g, '')
            var v4 = $('#doubtCostDetail')
                .val()
                .replace(/^\s+|\s+$/g, '')
            var v5 = $('#problemType0')
                .val()
                .replace(/^\s+|\s+$/g, '')
            if (!v1 || !v4 || !v5) {
                return false
            }
            if (!v2 || v2.length > 40 || !isAcceptString(v2)) {
                return false
            }
            if (!v3 || v3.length > 9 || !isAcceptMoney(v3)) {
                return false
            }
            break
        case 1:
            var v1 = $('#rechargeTime')
                .val()
                .replace(/^\s+|\s+$/g, '')
            var v2 = $('#rechargeChannel')
                .val()
                .replace(/^\s+|\s+$/g, '')
            var v3 = $('#rechargeAmount')
                .val()
                .replace(/^\s+|\s+$/g, '')
            var v4 = $('#batchOrCardNo')
                .val()
                .replace(/^\s+|\s+$/g, '')
            var v5 = $('#problemType1')
                .val()
                .replace(/^\s+|\s+$/g, '')
            if (!v1 || !v5) {
                return false
            }
            if (!v2 || v2.length > 40 || !isAcceptString(v2)) {
                return false
            }
            if (!v3 || v3.length > 9 || !isAcceptMoney(v3)) {
                return false
            }
            if (!v4 || v4.length > 40 || !isAcceptString(v4)) {
                return false
            }
            break
        case 2:
            var v1 = $('#occurTime0')
                .val()
                .replace(/^\s+|\s+$/g, '')
            var v2 = $('#abnormalIntegralScore')
                .val()
                .replace(/^\s+|\s+$/g, '')
            var v3 = $('#problemType2')
                .val()
                .replace(/^\s+|\s+$/g, '')
            if (!v1 || !v3) {
                return false
            }
            if (!v2 || v2.length > 20 || !isAcceptScore(v2)) {
                return false
            }
            break
        case 3:
            var v1 = $('#occurTime1')
                .val()
                .replace(/^\s+|\s+$/g, '')
            var v2 = $('#busiNm0')
                .val()
                .replace(/^\s+|\s+$/g, '')
            var v3 = $('#problemType3')
                .val()
                .replace(/^\s+|\s+$/g, '')
            if (!v1 || !v3) {
                return false
            }
            if (!v2 || v2.length > 40 || !isAcceptString(v2)) {
                return false
            }
            break
        case 4:
            var v1 = $('#occurTime2')
                .val()
                .replace(/^\s+|\s+$/g, '')
            var v2 = $('#beComplainedNoOrAddr')
                .val()
                .replace(/^\s+|\s+$/g, '')
            var v3 = $('#problemType4')
                .val()
                .replace(/^\s+|\s+$/g, '')
            if (!v1 || !v3) {
                return false
            }
            if (!v2 || v2.length > 40 || !isAcceptString(v2)) {
                return false
            }
            break
        case 5:
            var v1 = $('#joinTime')
                .val()
                .replace(/^\s+|\s+$/g, '')
            var v2 = $('#marketDesc')
                .val()
                .replace(/^\s+|\s+$/g, '')
            var v3 = $('#problemType5')
                .val()
                .replace(/^\s+|\s+$/g, '')
            if (!v1 || !v3) {
                return false
            }
            if (!v2 || v2.length > 40 || !isAcceptString(v2)) {
                return false
            }
            break
        case 6:
            var v1 = $('#occurTime3')
                .val()
                .replace(/^\s+|\s+$/g, '')
            var v2 = $('#problemType6')
                .val()
                .replace(/^\s+|\s+$/g, '')
            if (!v1 || !v2) {
                return false
            }
            break
        case 7:
            var v1 = $('#occurTime4')
                .val()
                .replace(/^\s+|\s+$/g, '')
            var v2 = $('#busiNm1')
                .val()
                .replace(/^\s+|\s+$/g, '')
            var v3 = $('#problemType7')
                .val()
                .replace(/^\s+|\s+$/g, '')
            if (!v1 || !v3) {
                return false
            }
            if (!v2 || v2.length > 40 || !isAcceptString(v2)) {
                return false
            }
            break
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
            var v1 = $('#failureTime')
                .val()
                .replace(/^\s+|\s+$/g, '')
            var v2 = $('#failureLocation')
                .val()
                .replace(/^\s+|\s+$/g, '')
            var v3 = $('#surroundUserCond')
                .val()
                .replace(/^\s+|\s+$/g, '')
            if (!v1 || !v3) {
                return false
            }
            if (!v2 || v2.length > 40 || !isAcceptString(v2)) {
                return false
            }
            if (_isOpen == 'open') {
                var v4 = $('#respCityCode')
                    .val()
                    .replace(/^\s+|\s+$/g, '')
                var v5 = $('#faultDistrtId')
                    .val()
                    .replace(/^\s+|\s+$/g, '')
                var v6 = $('#provSelectCode')
                    .val()
                    .replace(/^\s+|\s+$/g, '')
                if (!v4 || !v5 || !v6) {
                    return false
                }
            }
            break
        default:
            break
    }

    // if(secondTypeIndex < 8){
    var v = $('#bizCntt')
        .val()
        .replace(/^\s+|\s+$/g, '')
    if (!v || v.length < 15 || v.length > 400 || !isAcceptString(v)) {
        return false
    }
    // }
    var t = $('#fstConcTelnum1')
        .val()
        .replace(/^\s+|\s+$/g, '')
    if (t && !isAcceptTel(t)) {
        return false
    }
    return true
}
function goback() {
    $('.container .disclaimers').show()
    $('.container .main').show()
    $('.create-result').hide()
}
// 提交表单
function submitForm() {
    // $('#reCreateModal').modal('show');
    // return;
    // $(".container .disclaimers").hide();
    //             $(".container .main").hide();
    //             $(".create-result").show();
    //             return;
    // if(Math.random() > 0.5){
    //     setLimitText();
    //     $('#myModal').modal('show');
    // }else {
    //     $('#myModal .modal-header .logo').attr('src', '../../images/new/comp-order-success@2x.png');
    //     $("#myModal .modal-body .title").hide();
    //     $("#myModal .modal-body .limit").hide();
    //     $('#myModal .modal-body .word').html('提交成功，您反馈的问题已受理').show();
    //     $('#myModal').modal('show');
    // }
    // $('#loading').modal('show');
    // $('.modal-backdrop').css('background-color', '#FFFFFF');
    // $('.modal-backdrop.in').css('filter', 'alpha(opacity=50)');
    // $('.modal-backdrop.in').css('fiopacitylter', '0');
    // setTimeout(function(){$('#loading').modal('hide');},300000);
    // return;
    var publicParams = {}
    var characterParams = {}
    // setting
    publicParams.firstSrType = secondTypeIndex > 7 ? '网络信号' : '个人业务'
    publicParams.secondSrType = secondProblemTypeList[secondTypeIndex]
    publicParams.bizCntt = $('#bizCntt').val()
    publicParams.fstConcTelnum1 = $('#fstConcTelnum1').val()
    switch (secondTypeIndex) {
        case 0:
            characterParams.doubtCostTime = $('#doubtCostTime').val() // 疑问费用产生时间
            characterParams.doubtCostBusiNm = $('#doubtCostBusiNm').val() // 疑问费用业务名称
            characterParams.doubtCostAmount = $('#doubtCostAmount').val() // 疑问费用金额
            characterParams.doubtCostDetail = $('#doubtCostDetail').val() // 是否有话费详单
            publicParams.problemType = $('#problemType0').val()
            break
        case 1:
            characterParams.rechargeTime = $('#rechargeTime').val() // 充值/缴费时间
            characterParams.rechargeChannel = $('#rechargeChannel').val() // 充值/缴费途径
            characterParams.rechargeAmount = $('#rechargeAmount').val() // 充值/缴费金额
            characterParams.batchOrCardNo = $('#batchOrCardNo').val() // 交易流水号或充值卡号
            publicParams.problemType = $('#problemType1').val()
            break
        case 2:
            characterParams.occurTime = $('#occurTime0').val() // 问题发生时间
            characterParams.abnormalIntegralScore = $('#abnormalIntegralScore').val() // 异常积分分值
            publicParams.problemType = $('#problemType2').val()
            break
        case 3:
            characterParams.occurTime = $('#occurTime1').val() // 问题发生时间
            characterParams.busiNm = $('#busiNm0').val() // 业务名称
            publicParams.problemType = $('#problemType3').val()
            break
        case 4:
            characterParams.occurTime = $('#occurTime2').val() // 问题发生时间
            characterParams.beComplainedNoOrAddr = $('#beComplainedNoOrAddr').val() // 被投诉人员工号或服务厅地址
            publicParams.problemType = $('#problemType4').val()
            break
        case 5:
            characterParams.joinTime = $('#joinTime').val() // 活动参加时间
            characterParams.marketDesc = $('#marketDesc').val() // 参加的营销活动名称或活动描述
            publicParams.problemType = $('#problemType5').val()
            break
        case 6:
            characterParams.occurTime = $('#occurTime3').val() // 问题发生时间
            publicParams.problemType = $('#problemType6').val()
            break
        case 7:
            characterParams.occurTime = $('#occurTime4').val() // 问题发生时间
            characterParams.busiNm = $('#busiNm1').val() // 业务、套餐名称
            publicParams.problemType = $('#problemType7').val()
            break
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
            characterParams.failureTime = $('#failureTime').val() // 故障时间
            characterParams.failureLocation = $('#failureLocation').val() // 故障地点（详细到具体区、街道、乡镇、村小组）
            characterParams.surroundUserCond = $('#surroundUserCond').val() // 周围用户使用情况
            if (_isOpen == 'open') {
                characterParams.respCityCode = $('#respCityCode').val() // 故障地市code
                characterParams.faultDistrtId = $('#faultDistrtId').val() // 故障区县code
                characterParams.cmplntsAddr = $('#failureLocation').val() // 取值failureLocation
            }
            break
        default:
            break
    }
    $('#loading').modal('show')
    $('.modal-backdrop').css('background-color', '#FFFFFF')
    $('.modal-backdrop.in').css('filter', 'alpha(opacity=50)')
    $('.modal-backdrop.in').css('fiopacitylter', '0')
    var inputArrays = [
        'doubtCostBusiNm',
        'rechargeChannel',
        'batchOrCardNo',
        'busiNm',
        'beComplainedNoOrAddr',
        'marketDesc',
        'failureLocation',
        'bizCntt',
        'fstConcTelnum1'
    ]
    var publicParamsChecking = {}
    for (var key in publicParams) {
        if (inputArrays.includes(key)) {
            publicParamsChecking[key] = publicParams[key]
        }
    }
    var characterParamsChecking = {}
    for (var key2 in characterParams) {
        if (inputArrays.includes(key2)) {
            characterParamsChecking[key2] = characterParams[key2]
        }
    }
    $.ajax({
        method: 'POST',
        timeout: 15000,
        data: {
            paramsStr: aesEncrypt(JSON.stringify(Object.assign(publicParamsChecking, characterParamsChecking)))
        },
        url: '../../complaint/pc/sensitiveWordCheck',
        success: function(res) {
            if (res.bean && res.bean.data && res.bean.data.sensitiveWordKey) {
                var sensitiveResult = res.bean.data.sensitiveWordKey
                sensorTrack('PopExposure', {
                    window_id: '',
                    window_name: '含敏感词请重新输入',
                    window_type: '投诉'
                })
                $('#loading').modal('hide')
                $('#btn-submit').addClass('is-noaccept')
                if (sensitiveResult.indexOf(',') > -1) {
                    var sensitiveWordKeys = sensitiveResult.split(',')
                    sensitiveWordKeys.forEach(function(objKey) {
                        if (objKey === 'busiNm' && secondTypeIndex === 3) {
                            $('#' + objKey + '0')
                                .prev()
                                .html('含敏感词语，请重新输入')
                                .removeClass('hide')
                        } else if (objKey === 'busiNm' && secondTypeIndex === 7) {
                            $('#' + objKey + '1')
                                .prev()
                                .html('含敏感词语，请重新输入')
                                .removeClass('hide')
                        } else {
                            $('#' + objKey)
                                .prev()
                                .html('含敏感词语，请重新输入')
                                .removeClass('hide')
                        }
                    })
                } else {
                    if (sensitiveResult === 'busiNm' && secondTypeIndex === 3) {
                        $('#' + sensitiveResult + '0')
                            .prev()
                            .html('含敏感词语，请重新输入')
                            .removeClass('hide')
                    } else if (sensitiveResult === 'busiNm' && secondTypeIndex === 7) {
                        $('#' + sensitiveResult + '1')
                            .prev()
                            .html('含敏感词语，请重新输入')
                            .removeClass('hide')
                    } else {
                        $('#' + sensitiveResult)
                            .prev()
                            .html('含敏感词语，请重新输入')
                            .removeClass('hide')
                    }
                }
            } else {
                $.ajax({
                    method: 'POST',
                    timeout: 15000,
                    data: {
                        plat: '',
                        publicParamsStr: aesEncrypt(JSON.stringify(publicParams)),
                        characterParamsStr: aesEncrypt(JSON.stringify(characterParams))
                    },
                    url: '../../complaint/pc/create',
                    success: function(res) {
                        $('#loading').modal('hide')
                        if (
                            res.returnCode == 0 &&
                            res.bean &&
                            res.bean.status == 0 &&
                            res.bean.restStatus &&
                            res.bean.restStatus.status == 0 &&
                            res.bean.data &&
                            res.bean.data.rtnCode == '0'
                        ) {
                            updateComplaintCounts()
                            // $('#myModal .modal-header .logo').attr('src', '../../images/new/comp-order-success@2x.png');
                            // $("#myModal .modal-body .title").hide();
                            // $("#myModal .modal-body .limit").hide();
                            // $('#myModal .modal-body .word').html('提交成功，您反馈的问题已受理').show();
                            // $('#myModal').modal('show');
                            $('.reset-value').val('')
                            reSetAddrOpinion()
                            $('.container .disclaimers').hide()
                            $('.container .main').hide()
                            $('.create-result').show()
                        } else if (res.bean && res.bean.data && res.bean.data.rtnCode == '-9999') {
                            setLimitText()
                            $('#myModal .modal-body .limit').hide()
                            $('#myModal .modal-body .limit').text(
                                res.bean.data.rtnMsg ||
                                '每位用户7天内在互联网提交投诉数量最多为3次。给您带来不便，敬请谅解！如有疑问可拨打10086热线。'
                            )
                            $('#myModal').modal('show')
                        } else if (res.bean && res.bean.data && res.bean.data.rtnCode == '-99999') {
                            setLimitText()
                            $('#myModal .modal-body .limit').hide()
                            $('#myModal .modal-body .limit')
                                .html(
                                    res.bean.data.rtnMsg ||
                                    '同一其他联系方式号码7天内在互联网提交投诉数量最多为5次，给您带来的不便，敬请谅解！如有疑问可拨打10086热线'
                                )
                                .show()
                            $('#myModal').modal('show')
                        } else if (res.bean && res.bean.data && res.bean.data.rtnCode == '-100') {
                            $('#reCreateModal').modal('show')
                        } else if ('0000' == res.code) {
                            $('#myModal .modal-header .logo').attr('src', '../../images/new/comp-order-error@2x.png')
                            $('#myModal .modal-body .title').hide()
                            $('#myModal .modal-body .limit').hide()
                            $('#myModal .modal-body .word')
                                .html(res.msg)
                                .show()
                            $('#myModal').modal('show')
                        } else {
                            $('#myModal .modal-header .logo').attr('src', '../../images/new/comp-order-error@2x.png')
                            $('#myModal .modal-body .title').hide()
                            $('#myModal .modal-body .limit').hide()
                            $('#myModal .modal-body .word')
                                .html('提交失败，如有疑问，请您致电10086')
                                .show()
                            $('#myModal').modal('show')
                        }
                    },
                    error: function(err) {
                        $('#loading').modal('hide')
                        $('#myModal .modal-header .logo').attr('src', '../../images/new/comp-order-error@2x.png')
                        $('#myModal .modal-body .title').hide()
                        $('#myModal .modal-body .limit').hide()
                        $('#myModal .modal-body .word')
                            .html('提交失败，如有疑问，请您致电10086')
                            .show()
                        $('#myModal').modal('show')
                    }
                })
            }
        },
        error: function(err) {
            $.ajax({
                method: 'POST',
                timeout: 15000,
                data: {
                    plat: '',
                    publicParamsStr: JSON.stringify(publicParams),
                    characterParamsStr: JSON.stringify(characterParams)
                },
                url: '../../complaint/pc/create',
                success: function(res) {
                    $('#loading').modal('hide')
                    if (
                        res.returnCode == 0 &&
                        res.bean &&
                        res.bean.status == 0 &&
                        res.bean.restStatus &&
                        res.bean.restStatus.status == 0 &&
                        res.bean.data &&
                        res.bean.data.rtnCode == '0'
                    ) {
                        updateComplaintCounts()
                        // $('#myModal .modal-header .logo').attr('src', '../../images/new/comp-order-success@2x.png');
                        // $("#myModal .modal-body .title").hide();
                        // $("#myModal .modal-body .limit").hide();
                        // $('#myModal .modal-body .word').html('提交成功，您反馈的问题已受理').show();
                        // $('#myModal').modal('show');
                        $('.reset-value').val('')
                        reSetAddrOpinion()
                        $('.container .disclaimers').hide()
                        $('.container .main').hide()
                        $('.create-result').show()
                    } else if (res.bean && res.bean.data && res.bean.data.rtnCode == '-9999') {
                        setLimitText()
                        $('#myModal .modal-body .limit').hide()
                        $('#myModal .modal-body .limit').text(
                            res.bean.data.rtnMsg ||
                            '每位用户7天内在互联网提交投诉数量最多为3次。给您带来不便，敬请谅解！如有疑问可拨打10086热线。'
                        )
                        $('#myModal').modal('show')
                    } else if (res.bean && res.bean.data && res.bean.data.rtnCode == '-99999') {
                        setLimitText()
                        $('#myModal .modal-body .limit').hide()
                        $('#myModal .modal-body .limit')
                            .html(
                                res.bean.data.rtnMsg ||
                                '同一其他联系方式号码7天内在互联网提交投诉数量最多为5次，给您带来的不便，敬请谅解！如有疑问可拨打10086热线'
                            )
                            .show()
                        $('#myModal').modal('show')
                    } else if (res.bean && res.bean.data && res.bean.data.rtnCode == '-100') {
                        $('#reCreateModal').modal('show')
                    } else if ('0000' == res.code) {
                        $('#myModal .modal-header .logo').attr('src', '../../images/new/comp-order-error@2x.png')
                        $('#myModal .modal-body .title').hide()
                        $('#myModal .modal-body .limit').hide()
                        $('#myModal .modal-body .word')
                            .html(res.msg)
                            .show()
                        $('#myModal').modal('show')
                    } else {
                        $('#myModal .modal-header .logo').attr('src', '../../images/new/comp-order-error@2x.png')
                        $('#myModal .modal-body .title').hide()
                        $('#myModal .modal-body .limit').hide()
                        $('#myModal .modal-body .word')
                            .html('提交失败，如有疑问，请您致电10086')
                            .show()
                        $('#myModal').modal('show')
                    }
                },
                error: function(err) {
                    $('#loading').modal('hide')
                    $('#myModal .modal-header .logo').attr('src', '../../images/new/comp-order-error@2x.png')
                    $('#myModal .modal-body .title').hide()
                    $('#myModal .modal-body .limit').hide()
                    $('#myModal .modal-body .word')
                        .html('提交失败，如有疑问，请您致电10086')
                        .show()
                    $('#myModal').modal('show')
                }
            })
        }
    })
}
function submitBefore() {
    var ispassed = checkParams()
    var isGray = $('#btn-submit').hasClass('is-noaccept')
    if (ispassed && !isGray) {
        submitForm()
    } else {
        // $('#checkWarning .modal-body .alert-danger').html(checkResult.toastMessage);
        // $('#checkWarning').modal('show');
        // setTimeout(function () { $('#checkWarning').modal('hide'); }, 3000);
    }
}
$(function() {
    $('#sjyyt').mouseenter(function() {
        ShowDivYYT()
    })
    $('#sjyyt').mouseleave(function() {
        HideDivYYT()
    })
    $('#btnDisclaimers').on('click', function() {
        let topValue = $('#disclaimers').height() * 0.5 + 'px'
        console.log(
            'window.screen.offsetHeight',
            document.body.offsetHeight,
            document.body.clientHeight,
            window.screen.height,
            window.screen.availHeight,
            $('#disclaimers').height()
        )
        $('#disclaimers').css('display', 'block')
        $('#disclaimersWrap').css('margin-top', topValue)
    })
    $('#disclaimersClose').on('click', function() {
        $('#disclaimers').css('display', 'none')
    })
    setCreateItem(0)
    initTimeSelecter()
    initOtherSelecter()
    initOnchange()
    initButtonWatch()
    requestComplaintCounts()
    if (_isOpen == 'open') {
        getAddrInfo()
    }
    var ieVerison = IEVersion()
    if ([6, 7, 8].indexOf(ieVerison) > -1) {
        $('.lowerIEtips').removeClass('hide')
        $('#closeTips').on('click', function() {
            $('.lowerIEtips').addClass('hide')
        })
    }
})
