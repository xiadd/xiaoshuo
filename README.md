## 数据库该如何设计

1. 怎么存储小说类型

单独存储在一个col中

2. 怎么存储小说（包括章节目录）

小说名，作者，更新日期等，存在一个document中

3. 怎么存储章节内容

单独存储

4. 需要将章节内容进行存储吗

- 不存储
节省数据库，单个文档可能超过16m，省钱

- 存储
如何关联
