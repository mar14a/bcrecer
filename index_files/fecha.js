jQuery(document).ready(function($){
  	$("div[id=sp-logo]").css("padding-right","0px").css("padding-left","0px");
  	$("div[id=sp-menu]").css("padding-right","0px").css("padding-left","0px");

	/* Class Changes */
	$("li.sp-menu-item > a.button-bdigital").html(
		'<button type="submit" id="btn_verify" class="btn btn-primary" style="border-color: #dc291e; background-color: #dc291e;font-size: 12px;"><b>BDIGITAL</b></button>'
	);
	$("li.sp-menu-item > a.button-bservicios").html(
		'<button type="submit" id="btn_verify" class="btn btn-primary" style="border-color: #6051a1; background-color: #6051a1;font-size: 12px;"><b>BSERVICIOS</b></button>'
	);

  	/* Socials link */
  	$("i.fa-behance").removeClass("fa-behance").addClass("fa-instagram");
  	var fb = $("i.fa-facebook").parent().attr("href");
  	var tw = $("i.fa-twitter").parent().attr("href");
  	var lk = $("i.fa-linkedin").parent().attr("href");
  	var ig = $("i.fa-instagram").parent().attr("href");
  	$('ul.social-icons').find('a').each(function(){
      $(this).removeAttr("href");
      $(this).removeAttr("target");
      $(this).css('cursor', 'pointer');
      $(this).click(function(){
        
        Swal.fire({
          // title: 'Notificación',
          text: "Bancrecer te recuerda que estás saliendo de una página web segura, por lo que no se hace responsable de tu seguridad al ingresar a este vínculo. ¿Quieres ingresar de todas formas?",
          icon: 'warning',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          showCancelButton: true,
          confirmButtonColor: '#dc3545',
          cancelButtonColor: '#f8f9fa',
          confirmButtonText: 'Sí',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.value) {
            if ($(this).find("i").hasClass("fa-facebook")) {
              window.open(fb, "_blank");
            }else if ($(this).find("i").hasClass("fa-twitter")) {
              window.open(tw, "_blank");
            }else if ($(this).find("i").hasClass("fa-linkedin")) {
              window.open(lk, "_blank");
            }else if ($(this).find("i").hasClass("fa-instagram")) {
              window.open(ig, "_blank");
            }
          }
        });
        
        $(".swal2-popup").css("width","33.2rem").css("font-size","initial").css("top","-20%");
        $(".swal2-header").html('<div class="swal2-icon swal2-rrss-info" style="display: flex;"><i class="fa fa-exclamation-triangle" style="font-size: 35px;"></i></div>');
        $(".swal2-rrss-info").css("height","2em").css("margin-top","0.25em");
        //$(".swal2-warning").addClass("swal2-icon-show");
        //$(".swal2-warning").css("display","flex").css("font-size","14px");
        $("#swal2-content").css("font-size","14px");
        $(".swal2-confirm").css("font-size","11px").css("width","67px");
        $(".swal2-cancel").css("color","#5a5a5a").css("font-size","11px").css("width","67px");
        
      });
    });
  
    $("a.rrss_link").css('cursor', 'pointer').removeAttr("href");
  	$("a.rrss_link").click(function(){
      var rrss = $(this).attr("data-rrss");
      $("i." + rrss).parent().click();
    });
  
  
  	/* Date Configure */
	var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
	var f = new Date();
	var fecha = f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear();
	$('li.sp-contact-time').html('<i class="fa fa-clock-o"></i> ' + fecha);

	/* Home Menu */
	$("li:has(a.menu-inicio)").removeClass('sp-has-child');

	/* Chatbot Activate */
	$("li.sp-menu-item > a.chatbot").removeAttr('href').attr('onClick', 'javascript:myFunction();');
	$("li.item-647 > a.chatbot").removeAttr('href').attr('onClick', 'javascript:myFunction();');
	$("div.chatbot > a.scrollup1").attr('onClick', 'javascript:myFunction();');
	
	/* Contact Form - Page Contact Us */
	$("div#qx-contact-form-3616 > form").attr('action', '../../scripts/envioCorreoBancrecer.php');

	/* Analytics */
	$("div.googleAnalytics").html(
		"<!-- Global site tag (gtag.js) - Google Analytics - UA-127436690-1 --> <script async src='https://www.googletagmanager.com/gtag/js?id=UA-128924177-3'></script> <script>  window.dataLayer = window.dataLayer || [];  function gtag(){dataLayer.push(arguments);}  gtag('js', new Date());  gtag('config', 'UA-128924177-3'); </script>"
	);
});

/* CHATBOT 
function myFunction() {
	if(jQuery('#popup').is(":visible")){
		var muestra = document.getElementById("popup");
		muestra.style.display = "none";
		console.log('true');
	}else{
		var muestra = document.getElementById("popup");
		muestra.style.display = "block";
		console.log('false');
	}
}
*/
