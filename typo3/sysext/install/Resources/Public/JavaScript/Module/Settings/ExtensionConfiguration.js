/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
define(["require","exports","../AbstractInteractableModule","jquery","../../Router","TYPO3/CMS/Backend/Notification","TYPO3/CMS/Backend/ModuleMenu","bootstrap","../../Renderable/Clearable"],(function(t,e,a,r,s,n,i){"use strict";class o extends a.AbstractInteractableModule{constructor(){super(...arguments),this.selectorFormListener=".t3js-extensionConfiguration-form",this.selectorSearchInput=".t3js-extensionConfiguration-search"}initialize(t){this.currentModal=t,this.getContent(),t.on("keydown",e=>{const a=t.find(this.selectorSearchInput);e.ctrlKey||e.metaKey?"f"===String.fromCharCode(e.which).toLowerCase()&&(e.preventDefault(),a.focus()):27===e.keyCode&&(e.preventDefault(),a.val("").focus())}),t.on("keyup",this.selectorSearchInput,e=>{const a=r(e.target).val(),s=t.find(this.selectorSearchInput);t.find(".search-item").each((t,e)=>{const s=r(e);r(":contains("+a+")",s).length>0||r('input[value*="'+a+'"]',s).length>0?s.removeClass("hidden").addClass("searchhit"):s.removeClass("searchhit").addClass("hidden")}),t.find(".searchhit").collapse("show");const n=s.get(0);n.clearable(),n.focus()}),t.on("submit",this.selectorFormListener,t=>{t.preventDefault(),this.write(r(t.currentTarget))})}getContent(){const t=this.getModalBody();r.ajax({url:s.getUrl("extensionConfigurationGetContent"),cache:!1,success:e=>{!0===e.success&&(Array.isArray(e.status)&&e.status.forEach(t=>{n.success(t.title,t.message)}),t.html(e.html),this.initializeWrap())},error:e=>{s.handleAjaxError(e,t)}})}write(t){const e=this.getModalBody(),a=this.getModuleContent().data("extension-configuration-write-token"),o={};r.each(t.serializeArray(),(t,e)=>{o[e.name]=e.value}),r.ajax({url:s.getUrl(),method:"POST",data:{install:{token:a,action:"extensionConfigurationWrite",extensionKey:t.attr("data-extensionKey"),extensionConfiguration:o}},success:t=>{!0===t.success&&Array.isArray(t.status)?(t.status.forEach(t=>{n.showMessage(t.title,t.message,t.severity)}),"backend"===r("body").data("context")&&i.App.refreshMenu()):n.error("Something went wrong")},error:t=>{s.handleAjaxError(t,e)}}).always(()=>{})}initializeWrap(){this.findInModal(".t3js-emconf-offset").each((t,e)=>{const a=r(e),s=a.parent(),n=a.attr("id"),i=a.attr("value").split(",");a.attr("data-offsetfield-x","#"+n+"_offset_x").attr("data-offsetfield-y","#"+n+"_offset_y").wrap('<div class="hidden"></div>');const o=r("<div>",{class:"form-multigroup-item"}).append(r("<div>",{class:"input-group"}).append(r("<div>",{class:"input-group-addon"}).text("x"),r("<input>",{id:n+"_offset_x",class:"form-control t3js-emconf-offsetfield","data-target":"#"+n,value:r.trim(i[0])}))),d=r("<div>",{class:"form-multigroup-item"}).append(r("<div>",{class:"input-group"}).append(r("<div>",{class:"input-group-addon"}).text("y"),r("<input>",{id:n+"_offset_y",class:"form-control t3js-emconf-offsetfield","data-target":"#"+n,value:r.trim(i[1])}))),l=r("<div>",{class:"form-multigroup-wrap"}).append(o,d);s.append(l),s.find(".t3js-emconf-offsetfield").keyup(t=>{const e=s.find(r(t.currentTarget).data("target"));e.val(s.find(e.data("offsetfield-x")).val()+","+s.find(e.data("offsetfield-y")).val())})}),this.findInModal(".t3js-emconf-wrap").each((t,e)=>{const a=r(e),s=a.parent(),n=a.attr("id"),i=a.attr("value").split("|");a.attr("data-wrapfield-start","#"+n+"_wrap_start").attr("data-wrapfield-end","#"+n+"_wrap_end").wrap('<div class="hidden"></div>');const o=r("<div>",{class:"form-multigroup-wrap"}).append(r("<div>",{class:"form-multigroup-item"}).append(r("<input>",{id:n+"_wrap_start",class:"form-control t3js-emconf-wrapfield","data-target":"#"+n,value:r.trim(i[0])})),r("<div>",{class:"form-multigroup-item"}).append(r("<input>",{id:n+"_wrap_end",class:"form-control t3js-emconf-wrapfield","data-target":"#"+n,value:r.trim(i[1])})));s.append(o),s.find(".t3js-emconf-wrapfield").keyup(t=>{const e=s.find(r(t.currentTarget).data("target"));e.val(s.find(e.data("wrapfield-start")).val()+"|"+s.find(e.data("wrapfield-end")).val())})})}}return new o}));