<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>登陆移动公司网上营业厅</title>
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
                <li class="PnAndPwLogin">号码密码登录</li>
            </ul>
            <div class="tabsContent">
                <div id="number_login_main">
                    <div class="item clearfix" style="height: 24px;">
                        <input class="input" id="number" name="number" type="text" placeholder="请输入号码">
                    </div>
                    <div class="item passwordbox clearfix" style="height: 24px;">
                        <input class="input" id="password" type="password" placeholder="请输入密码">
                    </div>
                </div>
                <%--若要加其他登录验证方式则在此加入--%>
            </div>
             <button class="button" id="login_button" type="submit" onclick="LoginSubmit()">
                 登录
             </button>
            <a class="a" href="register_screen.jsp">
                开通号码
            </a>
        </div>
    </div>
<%--    <a class="a" href="complaint_and_maintenance_request_screen.jsp">--%>
<%--        前往投诉或申请--%>
<%--    </a>--%>
</div>

</body>
</html>
