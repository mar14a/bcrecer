jQuery(document).ready(function($){
const accordionItemHeaders = document.querySelectorAll(".accordion-item-header", ".accordion-item-header2"); accordionItemHeaders.forEach(accordionItemHeader => {
                                 accordionItemHeader.addEventListener("click", event => {
                                               const currentlyActiveAccordionItemHeader = document.querySelector(".accordion-item-header.active");
                                               if(currentlyActiveAccordionItemHeader && currentlyActiveAccordionItemHeader!==accordionItemHeader) {
                                                  currentlyActiveAccordionItemHeader.classList.toggle("active");
                                                  currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
                                               }
                                               accordionItemHeader.classList.toggle("active");
                                               const accordionItemBody = accordionItemHeader.nextElementSibling;
                                               if(accordionItemHeader.classList.contains("active")) {
                                                 accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
                                               }
                                               else {
                                                 accordionItemBody.style.maxHeight = 0;
                                               }
                                 });
                               });
  $('input.number').keyup(function(event) {
    // skip for arrow keys
    if(event.which >= 37 && event.which <= 40){
      event.preventDefault();
    }

    $(this).val(function(index, value) {
      return value
        .replace(/\D/g, "")
        .replace(/([0-9])([0-9]{2})$/, '$1,$2')  
        .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".")
      ;
    });
  });
	/**Nueva Version Validador de Documentos**/
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1;
	var yyyy = today.getFullYear();
	if(dd<10){
			dd='0'+dd
	}
	if(mm<10){
			mm='0'+mm
	}
	var max = yyyy+'-'+mm+'-'+dd;
	$("#date").attr("max",max);
	var searchParams = new URLSearchParams(window.location.search)
	if(searchParams.has('type')&&searchParams.has('account')&&searchParams.has('code')&&searchParams.has('date')){
		if(searchParams.get('type')=='reference'){
			$("#referenceType").attr('checked','checked');
		}else{
			$("#statementType").attr('checked','checked');
		}
		$("#account").val(searchParams.get('account'));
		$("#code").val(searchParams.get('code'));
		var dateParam=searchParams.get('date');
		if(dateParam.length==8){
			var dateValue=dateParam.substr(4)+"-"+dateParam.substr(2,2)+"-"+dateParam.substr(0,2)
			$("#date").val(dateValue);
			validateForm();
		}
	}
	$("#documentValidationForm").submit(function(e){
		e.preventDefault(e);
		validateForm();
	});
	function validateForm(){
		var type=$('input[name="type"]:checked').val();
		var account=$("#account").val();
		var code=$("#code").val();
		var date=$("#date").val();
		if(type!=undefined){
			if(account!=''){
				if(code!=''){
					if(date!=''){
						var dateArry=date.split("-");
						var formatDate=dateArry[2]+dateArry[1]+dateArry[0];
						var url="https://bservicios.bancrecer.com.ve:2043/api/validation/"+type+"/"+account+"/"+code+"/"+formatDate;
						$.ajax({
							url: url,
							type: 'GET',
							crossDomain: true,
							dataType: 'json',
							success: function (isValid) {
								if(isValid){
									Swal.fire(
										"Documento Valido",
										"Estimado cliente, información validada exitosamente.",
										"success"
									);
								}else{
									Swal.fire(
										"Documento Incorrecto",
										"Estimado cliente, verifique la información suministrada, intente de nuevo mas tarde.",
										"error"
									);
								}
							},
							error: function (err) {
								Swal.fire(
									"Error de Conexión",
									"Estimado cliente, en estos momentos no podemos procesar su solicitud, intente de nuevo mas tarde.",
									"warning"
								);
							}
						});
					}else{
						Swal.fire(
							"Fecha de Emisión Incorrecta",
							"Estimado cliente, debe seleccionar una fecha de emisión.",
							"error"
						);
					}
				}else{
					Swal.fire(
						"Código Validador Incorrecto",
						"Estimado cliente, ingresar el código validador.",
						"error"
					);
				}
			}else{
				Swal.fire(
					"Cuenta Incorrecta",
					"Estimado cliente, debe ingresar los 4 últimos dígitos del número de cuenta.",
					"error"
				);
			}
		}else{
			Swal.fire(
				"Tipo de Documento Incorrecto",
				"Estimado cliente, debe seleccionar un tipo de documento.",
				"error"
			);
		}
	}
	/**Nueva Version Validador de Documentos**/
});

/*function cargaDestino(){
    jQuery('option', '#mes').remove();
		jQuery('option', '#anio').remove();
		jQuery("#mes").append("<option value=''> Seleccione</option>");
		jQuery("#anio").append("<option value=''> Seleccione</option>");

		var f = new Date();
		var canMes=f.getMonth();
		var anio=f.getFullYear();

		for(var i=anio-1; i<anio+1; i++){
		  
		    jQuery("#anio").append("<option value=" + i + ">" + i + "</option>");
		    
		} 
        var select = document.forms.valida.tipo.value;
        console.log("select:"+select);
        if(select==2){
        	var destino = document.getElementById("form");
            destino.style.display = "none";
            var destino = document.getElementById("form2");
            destino.style.display = "block";
        }else{
        	var destino = document.getElementById("form2");
            destino.style.display = "none";
            var destino = document.getElementById("form");
            destino.style.display = "block";
        }
        


    }

	//===============================================================================================-->


function cargaMes(){


		var anioSelect=document.forms.contact_form.anio.value;
		//console.log("anio::"+anioSelect);

		if(anioSelect.length>0){

			jQuery('option', '#mes').remove();
	        jQuery("#mes").append("<option value=''> Seleccione</option>");

	        var f = new Date();
	        var canMes=f.getMonth();
	        var anio=f.getFullYear();

	        var desMes=['Enero','Febrero','Marzo','Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
	        var mes=['1','2','3','4', '5', '6', '7', '8', '9', '10', '11', '12'];

	        if (anioSelect == anio){

	        	for(var i=0; i<canMes; i++){
	          	
	                jQuery("#mes").append("<option value=" + mes[i] + ">" + desMes[i] + "</option>");
	            
	        	}

	        }else{

	        	for(var i=0; i<12; i++){
	          
	                jQuery("#mes").append("<option value=" + mes[i] + ">" + desMes[i] + "</option>");
	            
	        	}

	        }

		}else{
			swal({
                title: "Debe seleccionar el año",
                icon: "warning",
                buttons: "OK"
                })
                .then((willDelete) => {
                         
           });

		}

    	

    }

	//===============================================================================================-->


 function codigoLec(){
      

      var tipo= document.forms.valida.tipo.value;
      var url="";
      var descript="";
      var erro="";
      if(tipo==1){
        //url="http://ec2-54-218-83-59.us-west-2.compute.amazonaws.com:8080/serviceAccount/services/finhack/generaCodigo";
        url="https://doc.bancrecer.com.ve:8443/serviceAccount/services/finhack/generaCodigo";
        var salI=document.forms.contact_form.saldoIni.value;
        var salF=document.forms.contact_form.saldoFin.value;

        //console.log("Uno:"+salI+"|"+salF);

        var salIn=salI.replace(/\./g,"");
        var salFi=salF.replace(/\./g,"");

        //console.log("Dos:"+salIn+"|"+salFi);

        var salIni=salIn.replace(",",".");
        var salFin=salFi.replace(",",".");

        //console.log("tres:"+salIni+"|"+salFin);

        var saldoIni= parseFloat(salIni);
        var saldoFin= parseFloat(salFin);
        var cuenta1= document.forms.contact_form.cuenta1.value;
        var cuenta2= document.forms.contact_form.cuenta2.value;
        var codigo= document.forms.contact_form.codigo.value;
        var cedula=(document.forms.contact_form.nacion.value)+(document.forms.contact_form.cedula.value);
        descript="Estado de Cuenta Válido";
        erro="Estado de Cuenta inválido";
        var dataGen=JSON.stringify({
                fechaDesde: fechaDesde,
                fechaHasta: fechaHasta,
                saldoIni: saldoIni,
                saldoFin: saldoFin,
                cuentaIni: cuenta1,
                cuentaFin: cuenta2,
                identificacion: cedula
            });

        //console.log("Datos::"+fechaDesde+"|"+ fechaHasta+"|"+saldoIni +"|"+ saldoFin+"|"+ cuenta1+"|"+ cuenta2+"|"+codigo+"|"+url+"|"+cedula);
      }else if(tipo==2){
        //url="http://ec2-54-218-83-59.us-west-2.compute.amazonaws.com:8080/serviceAccount/services/finhack/generaCodigoRef";
        url="https://doc.bancrecer.com.ve:8443/serviceAccount/services/finhack/generaCodigoRef";
        var fechaGen= document.forms.contact_form1.fechaGen.value;
        var dia1=fechaGen.substring(8,10);
        var mes2= fechaGen.substring(5,7);
        var ano3= fechaGen.substring(0,4);
        var fecha1=dia1+"-"+mes2+"-"+ano3;
        var tipoRef= document.forms.contact_form1.promedio.value;
        var cuenta1= document.forms.contact_form1.cuenta1.value;
        var cuenta2= document.forms.contact_form1.cuenta2.value;
        var codigo= document.forms.contact_form1.codigo.value;
        var cedula=(document.forms.contact_form1.nacion.value)+(document.forms.contact_form1.cedula.value);
        descript="Referencia Bancaria Válida";
        erro="Referencia Bancaria inválida";
        var dataGen=JSON.stringify({
                fechaDesde: fecha1,
                saldoFin: tipoRef,
                cuentaIni: cuenta1,
                cuentaFin: cuenta2,
                identificacion: cedula
            });


        //console.log("Datos Ref::"+fecha1+"|"+ tipoRef+"|"+cuenta1 +"|"+ codigo+"|"+cuenta2+"|"+cedula);
      }

      jQuery.ajax({
            url: url,
            type: 'POST',
              beforeSend: function(){
                  jQuery('.ajax-loader').css("visibility", "visible");
                },
            headers: {
                              'contentType': 'application/json'
                          },
            contentType: 'application/json',
            data: dataGen,
            crossDomain: true,
    		dataType: 'json',
            success: function (data) {
                  
                  //console.log("Resultado:"+codigo+"|"+data.codigo);
                  if((codigo).toUpperCase()==data.codigo){
                    swal({
                          title: descript,
                          type: "success",
                          //buttons: "OK"
                          })
                          .then((willDelete) => {
                           borrar();
                     });
                      jQuery('.ajax-loader').css("visibility", "hidden");

                  }else{
                    swal({
                          title: erro,
                          text: "Intente nuevamente",
                          type: "warning",
                          //buttons: "OK"
                          })
                          .then((willDelete) => {
                            
                                   
                     });

                    jQuery('.ajax-loader').css("visibility", "hidden");
                  }
 
              },
              error: function (err) {
                  swal({
                          title: "Error de Conexión",
                          text: "Intente nuevamente",
                          type: "warning",
                          //buttons: "OK"
                          })
                          .then((willDelete) => {
                                   
                     });
                  jQuery('.ajax-loader').css("visibility", "hidden");
              }
        });


    }

    //===============================================================================================-->

    function borrar() {
      
      document.getElementById("contact_form").reset();
      document.getElementById("contact_form1").reset();
    }

    //===============================================================================================-->

var fechaDesde="";
var fechaHasta="";

function cargaFecha(){
        var elMes=document.forms.contact_form.mes.value;
        var elAnio=document.forms.contact_form.anio.value;
        
        var fechaDos='';

        if(elMes.length<2){
            elMes='0'+elMes;
        }
         if(elMes==1 | elMes==5 | elMes==7 | elMes==8 | elMes==10 | elMes==12){
            
            fechaDos='31'+'-'+elMes+'-'+elAnio;
         }else{
            if(elMes==2){
                fechaDos='28'+'-'+elMes+'-'+elAnio;
            }else{
                fechaDos='30'+'-'+elMes+'-'+elAnio;
            }
         }
         fechaUno='01'+'-'+elMes+'-'+elAnio;

         fechaDesde=fechaUno;
         fechaHasta=fechaDos;



    }

    //===============================================================================================-->
	
    function cargaOpcion(){

    	jQuery('option', '#mes').remove();
        jQuery('option', '#anio').remove();
        jQuery("#mes").append("<option value=''> Seleccione</option>");
        jQuery("#anio").append("<option value=''> Seleccione</option>");

        var f = new Date();
        var canMes=f.getMonth();
        var anio=f.getFullYear();

        for(var i=anio-1; i<anio+1; i++){
          
            jQuery("#anio").append("<option value=" + i + ">" + i + "</option>");
            
        } 

    }

//===============================================================================================-->
  
    function myFunction() {
      var objPopup = jQuery('#popup');
      if(objPopup.is(":visible")){
       //var muestra = document.getElementById("popup");
       //muestra.style.display = "none";
       objPopup.css('display', 'none');;
       console.log('true');
      }else{
       //var muestra = document.getElementById("popup");
       //muestra.style.display = "block";
       objPopup.css('display', 'block');;
       console.log('false');
      }        
    }
//===============================================================================================-->


function ver(){
  swal({
    title: '<strong>HTML <u>example</u></strong>',
    type: 'info',
    html:
      'You can use <b>bold text</b>, ' +
      '<a href="//github.com">links</a> ' +
      'and other HTML tags',
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText:
      '<i class="fa fa-thumbs-up"></i> Great!',
    confirmButtonAriaLabel: 'Thumbs up, great!',
    cancelButtonText:
      '<i class="fa fa-thumbs-down"></i>',
    cancelButtonAriaLabel: 'Thumbs down',
  })
 }*/
 
 
