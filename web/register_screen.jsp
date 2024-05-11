<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>开通新号码</title>
    <link rel="stylesheet" type="text/css" href="css/login_register_screen.css" />
    <link rel="stylesheet" href="https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.css">
</head>
<body>
<div class="content">
    <div class="top">
        <img src="img/login_head.png">
    </div>
    <div class="main">
        <div class="tabs">
            <ul class="tabsNav">
                <li class="PnAndPwLogin">新号码开通</li>
            </ul>
            <div class="tabsContent">
                <div id="number_register_main">
                    <div class="item clearfix" style="height: 24px;">
                        <input class="input" id="name" name="number" type="text" placeholder="请输入姓名">
                    </div>
                    <div class="item clearfix" style="height: 24px;">
                        <input class="input" id="ID_number" name="number" type="text" placeholder="请输入身份证号">
                    </div>
                    <div class="item passwordbox clearfix" style="height: 24px;">
                        <input class="input" id="password" type="password" placeholder="请输入密码">
                    </div>
                    <div class="item passwordbox clearfix" style="height: 24px;">
                        <input class="input" id="re_password" type="password" placeholder="请重复密码">
                    </div>
                </div>
                <%--若要加其他登录验证方式则在此加入--%>
            </div>
            <button class="button" id="register_button" type="submit" onclick="LoginSubmit()">
                开通
            </button>
            <a class="a" href="login_screen.jsp">
                返回登录
            </a>
        </div>
    </div>
<%--    <a class="a" href="complaint_and_maintenance_request_screen.jsp">--%>
<%--        前往投诉或申请--%>
<%--    </a>--%>
</div>

</body>
</html>
