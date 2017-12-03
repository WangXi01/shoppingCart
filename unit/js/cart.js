var vm = new Vue({
	el:'#app',
	data:{
		title:'hello vue',
		productionData:[],
		totalMoney:0,
		checkAllFlag:false,
		delFlag:false,
		index:'',
	},
	filters:{
		formatMoney:function(value){
			return "￥"+value.toFixed(2);
		}
	},
	mounted:function(){
		this.$nextTick(function(){
			vm.cartView()
		})
	},
	methods:{
		cartView:function(){
			this.$http.get('./data/cartData.json',{id:123}).then(res=>{
				this.productionData = res.data.result.list;
			})
		},
		changeCart:function(product,way){
			if(way>0){
				product.productQuantity++;
			}else{
				product.productQuantity--;
				if(product.productQuantity<1){
					product.productQuantity=1;
				}
			}
		},
		checked:function(item){
			if(typeof item.checked == 'undefined'){
				this.$set(item,'checked',true);
			}else{
				item.checked = !item.checked;
			}
			this.calcPriceMoney();
		},
		checkAll:function(flag){
			this.checkAllFlag = flag;
			this.productionData.forEach((item,index)=>{
				if(typeof item.checked == 'undefined'){
					this.$set(item,'checked',this.checkAllFlag);
				}else{
					item.checked = this.checkAllFlag;
				}
			})
			this.calcPriceMoney();
		},
		calcPriceMoney:function(){
			this.totalMoney = 0;
			this.productionData.forEach((item,index)=>{
				if(item.checked){
					this.totalMoney += item.productPrice*item.productQuantity;
				}
			})
		},
		delConfirm:function(index){
			this.delFlag = true;
			this.index = index;
		},
		delProduct:function(){
			this.productionData.splice(this.index,1);
			this.delFlag = false;
		}
		
	}
})