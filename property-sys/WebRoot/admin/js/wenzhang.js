$().ready(function(){
	$("#menu-neirong").addClass("active");
	var table_wenzhang=$("#table-wenzhang").DataTable({
		"columns":[//定义要显示的列名
					{ data: 'id',sTitle:"",
						render: function(id) {
			        		var cell = arguments[3];
			        		var index = (cell.settings._iDisplayStart+cell.row+1);
							var str = "<input class='tcheckbox' id='d"+index+"' name='slecteOrder' data-uid='"+id+"' type=checkbox> "
							   +"<label for='d"+index+"'>"+index+"</label>";
							return str;
			        	}
					},
					{data : 'title',sTitle : "标题"},
					{data : 'author',sTitle : "发布人"}, 
					{data : 'publishDate',sTitle : "发布时间"},
					{data : 'content',sTitle : "发布内容"},
					{data : 'type',sTitle : "类型"}, 
					{data : 'visitors',sTitle : "访问人数"}
				],
		"order": [[ 1, 'asc' ]],
		"scrollX": true,//水平滚动条
		"scrollXInner":"120%",
		"processing": true,
	    "serverSide": true,
	    "bAutoWidth": false,//自适应宽度
	    "aLengthMenu": [5,10, 20, 30, 50],//定义每页显示数据数量
	    "fnServerData":function(n,params,fnCallback,table){//向后台请求列表数据
	    	params.push({name:"sSearch",value:params[5].value.value});
	    	$.ajax({
	    		url:"/property-sys/property-sys/articleAction!listArticleByParams.action",
	    		type:"post",
	    		dataType:"json",
	    		data:{dataTableParams:JSON.stringify(params)},
	    		success:function(d){
	   			fnCallback(d.msg);
	   		}
	   	});
	   },
		"sort": false,
		"language": {
			"search":"快速搜索",                    //汉化   
		    "lengthMenu": "每页显示 _MENU_ 条记录",   
		    "zeroRecords": "没有查询到相关数据",
		    "info" : "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
		    "infoEmtpy": "没有数据",   
		    "processing": "正在加载数据...",   
		    "paginate": {   
		        "first": "首页",   
		        "previous": "上一页",
		        "next": "下一页",   
		        "last": "尾页"  
			} 
		}
	});
	
	//删除文章
	$("#btn_delete_wenzhang").on("click.delete",function(){
		var ListId = controls.getCheckedId("#table-wenzhang");
		if(ListId.length>0){
			$.W.alert("确定删除"+ListId.length+"条记录？",true,function(){
				console.log("参数id数组："+ListId);
				//ajax提交
				$.ajax({
	        		url:"/property-sys/property-sys/articleAction!deleteArticleByIds.action",
	        		type:"post",
	        		dataType:"json",
	        		data:{ids:ListId.toString()},
	        		success:function(d){
	        			$.W.alert(d.msg,true);
	        			//删除后刷新表格
	        			if(d.success){
	        				table_wenzhang.draw();
	        				//window.location.reload(true);
	        			}
	        		}
	        	});
			});
		}else{
			$.W.alert("请选中要删除的文章！",true);
		}
	});
	//查看文章
	$("#btn_look_wenzhang").click(function(){
		//选中的行
		//获取到该行的所有信息
		var $tr = $("#table-wenzhang [name='slecteOrder']:checked").parent().parent();
		var obj = table_wenzhang.row($tr.eq(0)).data();
		if($tr.length>1){
			$.W.alert("不能同时查看多条记录!",true);
		}else if($tr.length<=0){
			$.W.alert("请先选中行再点击查看!",true);
		}else{
			//将信息填充到表单上
			$("#look-title").val(obj.title);
			$("#look-content").val(obj.content);
			$("#look-author").val(obj.author);
			$("#look-publishDate").val(obj.publishDate);
			$("#look-type").val(obj.type);
			$("#look-visitors").val(obj.visitors);
			$("#look-wenzhang").modal("show");
		}
	});
	//弹出发布公告窗口
	$("#btn_publish_gonggao").click(function(){
		//重置表单,ps:form元素才有reset
		$("#publish-gonggao").find("form")[0].reset();
		$("#publish-gonggao").modal("show");
	});
	//发布
	$("#btn-publish-gonggao").off('click.save').on("click.save",function(){
		$.ajax({
	        type: "POST",
	        dataType: "json",
	        url:"/property-sys/property-sys/articleAction!publish.action",
	        data:{
				"article.title":$("#publish-gonggao").find("[name=title]").val(),
				"article.content":$("#publish-gonggao").find("[name=content]").val(),
				"article.type":"公告",
				"options":""//选项
			},
	        success: function (d) {
	        	$.W.alert(d.msg,true);
	        	if(d.success){
	        		$("#publish-gonggao").modal('hide');
	        		table_wenzhang.draw();
	        	}
	        }
		});
	});
	
});