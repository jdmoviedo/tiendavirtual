<%-- 
    Document   : template
    Created on : 23/09/2021, 05:12:59 PM
    Author     : JuanD
--%>

<%@page contentType="text/html" pageEncoding="UTF-8" session="true"%>
<html class="no-js" lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title><%=request.getParameter("title")%></title>
        <meta name="description" content="">
        <meta name="keywords" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link href="dist/img/logo.png" rel="icon" type="image/png">

        <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:300,400,600,700,800" rel="stylesheet">

        <link rel="stylesheet" href="plugins/bootstrap/dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="plugins/fontawesome-free/css/all.min.css">
        <link rel="stylesheet" href="plugins/icon-kit/dist/css/iconkit.min.css">
        <link rel="stylesheet" href="plugins/ionicons/dist/css/ionicons.min.css">
        <link rel="stylesheet" href="plugins/perfect-scrollbar/css/perfect-scrollbar.css">
        <link rel="stylesheet" href="plugins/datatables.net-bs4/css/dataTables.bootstrap4.min.css">
        <link rel="stylesheet" href="plugins/datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css">
        <link rel="stylesheet" href="plugins/select2/dist/css/select2.min.css">
        <link rel="stylesheet" href="plugins/datedropper/datedropper.min.css">
        <link rel="stylesheet" href="plugins/datedropper/themes.css">
        <link rel="stylesheet" href="plugins/mohithg-switchery/dist/switchery.min.css">
        <link rel="stylesheet" href="plugins/jquery-toast-plugin/dist/jquery.toast.min.css">
        <link rel="stylesheet" href="dist/css/theme.css">
        <!-- icheck -->
        <link rel="stylesheet" href="plugins/iCheck/skins/all.css">
        <script src="src/js/vendor/modernizr-2.8.3.min.js"></script>
        <link href="dist/css/overlay.css" rel="stylesheet">
        <link href="dist/css/personalizado.css" rel="stylesheet">
        <link href="dist/css/tooltips.css" rel="stylesheet">
        <style>
            span.select2 + span.spanValidacion{
                left:50% !important;
            }
        </style>
    </head>
    <body>
        <input type="hidden" id="modalMostrar">
        <div class="overlayCargue">
            <lottie-player class="overlayLottie" src="dist/img/animations/carga.json" background="transparent" speed="1" loop autoplay></lottie-player>
        </div>
        <div class="wrapper">
            <header class="header-top" header-theme="light">
                <div class="container-fluid">
                    <div class="d-flex justify-content-between">
                        <div class="top-menu d-flex align-items-center">
                            <button type="button" class="btn-icon mobile-nav-toggle d-lg-none"><span></span></button>
                            <button type="button" id="navbar-fullscreen" class="nav-link"><i class="ik ik-maximize"></i></button>
                        </div>
                        <div class="top-menu d-flex align-items-center">
                            <div class="dropdown">
                                <a class="dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img class="avatar" src="<%  String foto =(String)session.getAttribute("foto");  
          if(foto == null){
             out.print("dist/img/user.svg");
          }else{
              foto = "data:image/png;base64,"+foto;
              out.print(foto);
          }
                                                                                                                                                                           %>" alt=""></a>
                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                                    <a class="dropdown-item" href="perfil.jsp"><i class="ik ik-user dropdown-icon"></i> Perfil</a>
                                    <!-- <a class="dropdown-item" href="#"><i class="ik ik-settings dropdown-icon"></i> Settings</a> -->
                                    <!-- <a class="dropdown-item" href="#"><span class="float-right"><span class="badge badge-primary">6</span></span><i class="ik ik-mail dropdown-icon"></i> Inbox</a> -->
                                    <!-- <a class="dropdown-item" href="#"><i class="ik ik-navigation dropdown-icon"></i> Message</a> -->
                                    <a class="dropdown-item" href="#" onclick="logout()"><i class="ik ik-power dropdown-icon"></i> Cerrar Sesion</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div class="page-wrap">
                <div class="app-sidebar colored">
                    <div class="sidebar-header">
                        <a class="header-brand" href="#">
                            <div class="logo-img">
                                <img src="dist/img/logo.png" class="${foto}header-brand-img">
                            </div>
                        </a>
                        <button type="button" class="nav-toggle"><i data-toggle="expanded" class="ik ik-toggle-right toggle-icon" style="color:#2DCE89"></i></button>
                    </div>

                    <div class="sidebar-content">
                        <div class="nav-container">
                            <nav id="main-menu-navigation" class="navigation-main">
                                <div class="nav-item has-sub text-capitalize">';
                                    <a href="#"><i class="fas fa-store-alt nav-icon"></i><span>Tienda</span></a>
                                    <div class="submenu-content">
                                        <a href="inventario.jsp" class="menu-item"><i class="fas fa-box-open nav-icon"></i>Inventario</a>
                                        <a href="ingresos.jsp" class="menu-item"><i class="fas fa-hand-holding-usd"></i>Ingresos</a>
                                        <a href="egresos.jsp" class="menu-item"><i class="fas fa-shopping-cart"></i>Egresos</a>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>

                <div class="main-content">
