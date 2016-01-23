    function initMap(){
        createMap();
        setMapEvent();
        addMapControl();
        addMarker();
    }
    function createMap(){
        var map = new BMap.Map("dituContent");
        var point = new BMap.Point(113.240796,38.807222);
        map.centerAndZoom(point,5);
        window.map = map;
    }
    
    
    function setMapEvent(){
        map.enableDragging();
        map.enableScrollWheelZoom();
        map.enableDoubleClickZoom();
        map.enableKeyboard();
    }
    
  
    function addMapControl(){
   
	var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_SMALL});
	map.addControl(ctrl_nav);
                }
    

    var markerArr = [{title:"pm2.5",content:"45",point:"116.368337|40.062645",isOpen:0,icon:{w:21,h:21,l:0,t:46,x:1,lb:10}}
		 ,{title:"2333",content:"6666",point:"121.44599|31.377733",isOpen:0,icon:{w:21,h:21,l:0,t:46,x:1,lb:10}}
		 ,{title:"ÎÒµÄ±ê¼Ç",content:"ÎÒµÄ±¸×¢",point:"118.723191|32.194903",isOpen:0,icon:{w:21,h:21,l:0,t:46,x:1,lb:10}}
		 ,{title:"ÎÒµÄ±ê¼Ç",content:"ÎÒµÄ±¸×¢",point:"120.047796|30.489608",isOpen:0,icon:{w:21,h:21,l:0,t:46,x:1,lb:10}}
		 ,{title:"ÎÒµÄ±ê¼Ç",content:"ÎÒµÄ±¸×¢",point:"126.597234|46.096791",isOpen:0,icon:{w:21,h:21,l:0,t:46,x:1,lb:10}}
		 ];

    function addMarker(){
        for(var i=0;i<markerArr.length;i++){
            var json = markerArr[i];
            var p0 = json.point.split("|")[0];
            var p1 = json.point.split("|")[1];
            var point = new BMap.Point(p0,p1);
			var iconImg = createIcon(json.icon);
            var marker = new BMap.Marker(point,{icon:iconImg});
			var iw = createInfoWindow(i);
			var label = new BMap.Label(json.title,{"offset":new BMap.Size(json.icon.lb-json.icon.x+10,-20)});
			marker.setLabel(label);
            map.addOverlay(marker);
            label.setStyle({
                        borderColor:"#808080",
                        color:"#333",
                        cursor:"pointer"
            });
			
			(function(){
				var index = i;
				var _iw = createInfoWindow(i);
				var _marker = marker;
				_marker.addEventListener("click",function(){
				    this.openInfoWindow(_iw);
			    });
			    _iw.addEventListener("open",function(){
				    _marker.getLabel().hide();
			    })
			    _iw.addEventListener("close",function(){
				    _marker.getLabel().show();
			    })
				label.addEventListener("click",function(){
				    _marker.openInfoWindow(_iw);
			    })
				if(!!json.isOpen){
					label.hide();
					_marker.openInfoWindow(_iw);
				}
			})()
        }
    }
  
    function createInfoWindow(i){
        var json = markerArr[i];
        var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>"+json.content+"</div>");
        return iw;
    }
  
    function createIcon(json){
        var icon = new BMap.Icon("http://app.baidu.com/map/images/us_mk_icon.png", new BMap.Size(json.w,json.h),{imageOffset: new BMap.Size(-json.l,-json.t),infoWindowOffset:new BMap.Size(json.lb+5,1),offset:new BMap.Size(json.x,json.h)})
        return icon;
    }
    initMap();