<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<script id="allow-copy_script">(function agent() {
    let unlock = false
    document.addEventListener('allow_copy', (event) => {
        unlock = event.detail.unlock
    })

    const copyEvents = [
        'copy',
        'cut',
        'contextmenu',
        'selectstart',
        'mousedown',
        'mouseup',
        'mousemove',
        'keydown',
        'keypress',
        'keyup',
    ]
    const rejectOtherHandlers = (e) => {
        if (unlock) {
            e.stopPropagation()
            if (e.stopImmediatePropagation) e.stopImmediatePropagation()
        }
    }
    copyEvents.forEach((evt) => {
        document.documentElement.addEventListener(evt, rejectOtherHandlers, {
            capture: true,
        })
    })
})()</script>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>网上营业厅投诉界面</title>
    <link rel="stylesheet" type="text/css" href="css/complaint_and_maintenance_request_screen.css" />
    <link rel="stylesheet" href="https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.css">
</head>
<div class="container">
    <img class="head" src="img/complaint_head.png" alt="head">

    <div class="main">
        <div class="problem-select">
            <p class="type-title">选择订单类型</p>
            <div class="type-content">
                <div class="item-select">
                    <p class="first-type">投诉订单</p>
                    <div class="flex-1">
                        <span onclick="setCreateItem(0)" class="active">费用疑问</span>
                        <span onclick="setCreateItem(1)">充值缴费</span>
                        <span onclick="setCreateItem(2)">积分业务</span>
                        <span onclick="setCreateItem(3)">扣费提醒</span>
                        <span onclick="setCreateItem(4)">服务质量</span>
                        <span onclick="setCreateItem(5)">营销活动质疑</span>
                        <span onclick="setCreateItem(6)">补卡、过户、销户</span>
                        <span onclick="setCreateItem(7)">业务、套餐变更问题</span>
                        <span onclick="setCreateItem(8)">其他</span>
                    </div>
                </div>
                <div class="item-select">
                    <p class="first-type">维修订单</p>
                    <div class="flex-1">
                        <span onclick="setCreateItem(8)">室内/室外无信号</span>
                        <span onclick="setCreateItem(9)">通话时出现断线</span>
                        <span onclick="setCreateItem(10)">上网时出现断线</span>
                        <span onclick="setCreateItem(11)">网速慢或网页无法打开</span>
                        <span onclick="setCreateItem(12)">有信号无法使用</span>
                        <span onclick="setCreateItem(13)">其他</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="problem-details">
            <p class="type-title">填写投诉/维修申请详情</p>
            <div class="details-content">
                <form class="form-horizontal row">
                    <div class="form-group col-sm-12 col-md-12 col-lg-6">
                        <label class="col-sm-4 col-md-4 col-lg-4 control-label">投诉/申请人号码</label>
                        <div class="col-sm-8 col-md-8 col-lg-8">
                            <input type="text" value="" class="form-control phoneColor">
                        </div>
                    </div>
                    <div class="form-group col-sm-12 col-md-12 col-lg-6">
                        <label class="col-sm-4 col-md-4 col-lg-4 control-label">投诉/申请人姓名</label>
                        <div class="col-sm-8 col-md-8 col-lg-8">
                            <input type="text" value="" class="form-control phoneColor">
                        </div>
                    </div>
                    <!-- start setting  -->
                    <!-- second-type0 -->
                    <div class="form-group col-sm-12 col-md-12 col-lg-6 second-type0 second-type" style="display: block;">
                        <label for="doubtCostTime" class="col-sm-4 col-md-4 col-lg-4 control-label">投诉/维修申请时间</label>
                        <div class="col-sm-8 col-md-8 col-lg-8">
                            <input type="text" value="" class="form-control reset-value" id="doubtCostTime" placeholder="请选择">
                        </div>
                    </div>
                    <div class="form-group col-sm-12 col-md-12 col-lg-6 second-type0 second-type" style="display: block;">
                        <label for="problemType0" class="col-sm-4 col-md-4 col-lg-4 control-label">问题类型</label>
                        <div class="col-sm-8 col-md-8 col-lg-8">
                            <div class="problemType0 own-select">
                                <input type="text" value="" placeholder="请选择" id="problemType0" class="form-control reset-value">
                            </div>
                        </div>
                    </div>

                    <div class="form-group col-sm-12 col-md-12 col-lg-12">
                        <label class="col-sm-4 col-md-4 col-lg-2 control-label text-area-offset-label">问题描述</label>
                        <div class="col-sm-8 col-md-8 col-lg-10">
                            <div class="error-tip hide"></div>
                            <textarea rows="6" maxlength="400" class="form-control reset-value" id="bizCntt" name="bizCntt" placeholder="请具体描述您需要解决的问题"></textarea>
                            <div class="textarea-tips">（至少输入15个字）0/400</div>
                        </div>
                    </div>
                    <div class="form-group col-sm-12 col-md-12 col-lg-6">
                        <label for="fstConcTelnum1" class="col-sm-4 col-md-4 col-lg-4 control-label not-required">其他联系方式</label>
                        <div class="col-sm-8 col-md-8 col-lg-8">
                            <div class="error-tip hide otherPhone-error-tip"></div>
                            <input type="text" maxlength="13" class="form-control reset-value" id="fstConcTelnum1" placeholder="请输入">
                        </div>
                    </div>
                </form>
                <div class="btn-disclaimers"><a id="btnDisclaimers" href="javascript:void(0)">查看《服务条款》</a></div>
                <div id="btn-submit" class="btn-submit is-noaccept" onclick="submitBefore()">同意上述条款并进行投诉</div>
            </div>
        </div>
    </div>
</div>

<%--<a class="bka" href="login_screen.jsp">--%>
<%--    前往登录界面--%>
<%--</a>--%>