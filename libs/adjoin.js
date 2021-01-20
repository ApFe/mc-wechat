class Adjoin {
  constructor(vertex) {
    this.vertex = vertex;
    console.log('init', vertex)
    this.quantity = vertex.length;
    this.adjoinArray = [];
    this.init();
  }
   
  init() {
    this.adjoinArray =  Array(this.quantity * this.quantity).fill(0);
  }
   
  container(vert, id) {
    let tem = -1
    vert.forEach((item, index) => {
      if (item.value_id === id.value_id) tem = index
    })
    return tem
  }
   
  getVertexCol(id) {
    const index = this.container(this.vertex, id)
    const index2 = this.vertex.indexOf(id);
    const col = [];
    this.vertex.forEach((item, pIndex) => {
      console.log('==',this.adjoinArray)
      col.push(this.adjoinArray[index + this.quantity * pIndex]);
    });
    console.log(index2 + ":" + col);
    console.log(col);
    return col;
  }
   
  setAdjoinVertexs(id, sides) {
    const pIndex = this.container(this.vertex, id)
    sides.forEach((item) => {
      const index = this.container(this.vertex, item)
      this.adjoinArray[pIndex * this.quantity + index] = 1;
    });
  }
   
  getColSum(params) {
    params = params.map(id => this.getVertexCol(id));
    console.log(params,'14')
    const adjoinNames = [];
    this.vertex.forEach((item, index) => {
      const rowtotal = params.map(value => value[index]).reduce((total, current) => {
        total += current || 0;
        return total;
      }, 0);
      adjoinNames.push(rowtotal);
    });
    return adjoinNames;
  }
   
  // 交集
  getUnions(params) {
    const row = this.getColSum(params);
    // console.log("row")
    // console.log(row)
    // row.map((item, index) => item >= params.length && this.vertex[index]).filter(Boolean);
    // return row.map((item, index) => item >= params.length && this.vertex[index]).filter(Boolean);
    let unions = [];
    row.forEach((item, index) => {
      if (item >= params.length && this.vertex[index])
        unions.push(this.vertex[index]);
    });
    return unions;
  }
   
  // 并集
  getCollection(params) {
    // params = this.getColSum(params);
    // return params.map((item, index) => item && this.vertex[index]).filter(Boolean);
    const paramsColSum = this.getColSum(params);
    let collections = [];
    paramsColSum.forEach((item, index) => {
      if (item && this.vertex[index]) collections.push(this.vertex[index]);
    });
    return collections;

  }
}
   
class ShopAdjoin extends Adjoin {
  constructor(commoditySpecs, data) {
    super(commoditySpecs.reduce((total, current) => [
      ...total,
      ...current.list,
    ], []));
    this.commoditySpecs = commoditySpecs;
    this.data = data;
    console.log('11=',commoditySpecs)
    console.log('11==',data)
    // 单规格矩阵创建
    this.initCommodity();
    // 同类顶点创建
    this.initSimilar();
  }
   
  initCommodity() {
    this.data.forEach((item) => {
      this.applyCommodity(item.specs);
    });
  }
   
  initSimilar() {
    // 获得所有可选项
    const specsOption = this.getCollection(this.vertex);
    this.commoditySpecs.forEach((item) => {
      const params = [];
      item.list.forEach((value) => {
        if (this.container(specsOption, value) > -1) params.push(value);
      });
      // 同级点位创建
      console.log('initSimilar', params)
      this.applyCommodity(params);
    });
  }
   
  querySpecsOptions(params) {
    // 判断是否存在选项填一个
    if (params.some(Boolean)) {
      // 过滤一下选项
      params = this.getUnions(params.filter(Boolean));
    } else {
      // 兜底选一个
      params = this.getCollection(this.vertex);
    }
    // console.log('querySpecsOptions', params)
    return params;
  }
   
  // 选出相应规格
  querySpecs(params) {
    let pIndex = -1
    this.data.forEach((items, index) => {
      let tem = 0
      items.specs.forEach((item) => {
        tem = params.includes(item.value) ? tem + 1 : tem
      })
      console.log('-----111111----------------------------')
      console.log('=====tem:',tem)
      console.log('==params:',params)
      console.log('==length:',params.length)
      console.log('===index:',index)
      console.log('-----11111----------------------------')
      if (tem === params.length) {
        console.log('-----222222----------------------------')
        console.log('=====tem:',tem)
        console.log('==params:',params)
        console.log('==length:',params.length)
        console.log('===index:',index)
        console.log('-----222222----------------------------')
        pIndex = index
      }else{
        console.log('-----33333----------------------------')
        console.log('=====tem:',tem)
        console.log('==params:',params)
        console.log('==length:',params.length)
        console.log('===index:',index)
        console.log('-----33333----------------------------')
      }
    });
    return pIndex
  }
   
  applyCommodity(params) {
    params.forEach((param) => {
      this.setAdjoinVertexs(param, params);
    });
  }
}
   
export {
  ShopAdjoin
}