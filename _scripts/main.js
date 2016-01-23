$(function() {
    $.getJSON('/data.php').done(function(data) {
        var globarr=[];
        // console.log(data);
        for (var i=0;i<data.length;i++) {
            globarr.push(data[i].name);
        }
        
        var map = new BMap.Map("l-map");
        map.centerAndZoom(new BMap.Point(117.269945,31.86713), 13);
        map.enableScrollWheelZoom(true);
        var index = 0;
        
        //console.log(globarr);
        var myGeo = new BMap.Geocoder();
        var adds = [];
        for (var i=0;i<globarr.length;i++)
            adds.push(globarr[i]);
        function bdGEO()
        {
            var add = adds[index];
            geocodeSearch(add);
            index++;
        }
        
        function geocodeSearch(add)
        {
            if(index < adds.length)
            {
                setTimeout(bdGEO,10);
            } 
            myGeo.getPoint(add, function(point)
            {
                if (point) 
                {
                    document.getElementById("result").innerHTML +=  index + "、" + add + ":" + point.lng + "," + point.lat + "</br>";
                    var address = new BMap.Point(point.lng, point.lat);
                    addMarker(address,new BMap.Label(index+":"+add,{offset:new BMap.Size(20,-10)}));
                }
            });
        }
        // 编写自定义函数,创建标注
        function addMarker(point,label)
        {
            var marker = new BMap.Marker(point);
            map.addOverlay(marker);
            marker.setLabel(label);
        }
        bdGEO();
                
                
                
                
                
                
                
    });
});