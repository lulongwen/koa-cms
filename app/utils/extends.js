function mixinsClass(...mixins) {
  class MixinClass {
    constructor() {
      for (let mixin of mixins) {
        copyProperties(this, new mixin(this)); // 拷贝实例属性 同时执行内部初始化
      }
    }
  }
  let proto = MixinClass.prototype;
  for (let mixin of mixins) {
    copyProperties(MixinClass, mixin); // 拷贝静态属性
    copyProperties(proto, mixin.prototype); // 拷贝原型属性
  }
  return MixinClass;
}

function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if (key !== 'constructor'
      && key !== 'prototype'
      && key !== 'name'
    ) {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}
