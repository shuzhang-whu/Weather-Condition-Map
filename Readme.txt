# 数据可视化大作业说明


联机：每刷新一次地图，apache服务器会调用一次python脚本，重新抓取数据，并用PHP传进HTML，然后显示在地图上。

可视化：三个地图，PM2.5全国实时数据地图
                  PM10全国实时数据地图
                  API指数全国实时数据地图
        右上角有一个excel download按钮，是下载数据文档(我在抓取数据后，重新用PHP将数据组织成excel格式，便于下载和分析)
        地图上方还有一排按钮，功能都已经标出。

工具：PYTHON，PHP,HTML+CSS+JS(jquery)，wampserver
