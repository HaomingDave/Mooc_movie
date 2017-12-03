## underscore  _.extend(destination, *sources) 
在更新的时候，使用先读取，再通过underscore extend方法更新，extend的使用方法如下:
Shallowly copy all of the properties in the source objects over to the destination object, and return the destination object. Any nested objects or arrays will be copied by reference, not duplicated. It's in-order, so the last source will override properties of the same name in previous arguments.
说人话：复制，重复的名字就覆盖。举个栗子 :
_.extend({name: 'moe'}, {age: 50});=> {name: 'moe', age: 50}
当然也可使用mongoose自带的update方法进行更新

## mongoose 链接和Promise的问题
Mongoose's default connection logic is deprecated as of 4.11.0. Please opt in to the new connection logic using the useMongoClient option, but make sure you test your connections first if you're upgrading an existing codebase!

由上面看出，之前的默认连接方式被弃用。所以必须要在后面加上链接选项，{useMongoClient:true}
mongoose.connect('mongodb://localhost/nodeWeb',{useMongoClient:true});

Pormise报错的话，加上下面这一句，或者如果你有习惯使用的promise框架，bluebird啥的也可以引入。这里不做阐述
mongoose.Promise = global.Promise;

#Express4
修改的地方记不清了（逃 ，自行查阅一下。主要修改地方也不是很多。

## boostrap4 原来方法弃用
### Renamed .control-label to .col-form-label.

### Horizontal forms overhauled:
Dropped the .form-horizontal class requirement.

### .dl-horizontal has been dropped. 
Instead, use .row on <dl> and use grid column classes (or mixins) on its <dt> and <dd> children.

基于boostrap新的写法我在文件中写出，可以自行查阅。

## jquery（admin.js）中 jquery Ajax问题
An alias for method. You should use type if you're using versions of jQuery prior to 1.9.0.
jquery ajax  type 换成 method。 在1.9版本之前可用type，虽然兼容但最好使用最新的。

## target 事件一点注析
target属性可返回事件的目标节点（触发该事件的节点），如生成事件的元素、文档或窗口。http://www.w3school.com.cn/jsref/event_target.asp
this就是指向当前事件所绑定的元素，而e.target指向事件执行时鼠标所点击区域的那个元素。容易搞不懂的地方是，初学者会认为当前事件所绑定的元素不就是鼠标所点击的那个元素嘛，这时候就要看看时间绑定的元素内部有没有子元素了，如果有子元素的话e.target指向这个子元素，如果没有，e.target和this都指向事件所绑定的元素。
