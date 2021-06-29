sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";
        var vFinal="";
        return Controller.extend("speechrecognisation.controller.App", 
        {
			onInit: function () {

            },
             onPress: function () 
             { 
                var oController = this;
                 if('webkitSpeechRecognition' in window)
                    {
                        this.recognition = new webkitSpeechRecognition() ;
                    }
                else
                    {
                        this.recognition = new SpeechRecognition();
                    }

                this.recognition.continuous = true;
                this.recognition.interimResults = false;
                this.recognition.lang = 'en-IN';
                this.recognition.onresult = function(event) 
                    {
                        for (var i = event.resultIndex; i < event.results.length; ++i) 
                            {
                                if (event.results[i].isFinal) 
                                    {
                                        vFinal = event.results[i][0].transcript;
                                    }
                            }
                    
                        if (vFinal != "") 
                            {
                                sap.m.MessageToast.show(vFinal);
                                oController.getView().byId("idInp").setValue(vFinal); 
                            }
                    };
       
                this.recognition.start();  
            }

        });
        
	});
