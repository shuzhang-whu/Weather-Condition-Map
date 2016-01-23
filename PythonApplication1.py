# -*- coding: UTF-8 -*- 
import re
import urllib2 
import string
import json
import codecs
import sys
reload(sys)
sys.setdefaultencoding('utf-8')
#print sys.getdefaultencoding()

#debug = open('debug.txt', 'w')

def getHtml(url):
    page = urllib2.urlopen(url)
    html = page.read()
    return html

def getData(html):
    data = re.compile('<td><a href=(.*)>(.*)</a></td>(\s+)<td>(.*)</td>(\s+)<td>(.*)</td>(\s+)<td>(.*)</td>(\s+)<td>(.*)</td>(\s+)<td>(.*)</td>(\s+)<td>(.*)</td>(\s+)<td>(.*)</td>(\s+)<td>(.*)</td>')
                                    #  0   1             2       3          4      5        6         7         8        9     10       11         12      13        14     15         16     17           
    result = re.findall(data, html)
    output = open('data.json','w')
    output.write('[');
    for i in range(len(result)):
        result[i] = list(result[i])
        output.write('{')
        output.write('"city" : "' + result[i][1] + '", ')
        output.write('"api" : ' + result[i][3]+', ')
        output.write('"state" : "' + result[i][7] + '", ')
        if result[i][9] == '_':
            result[i][9] = '0'
        output.write('"pm25": ' + result[i][9]+', ')
        if result[i][11] == '_':
            result[i][11] = '0'
        output.write('"pm10": ' + result[i][11]+', ')
        if result[i][13] == '_':
            result[i][13] = '0'
        output.write('"co": ' + result[i][13]+', ')
        if result[i][15] == '_':
            result[i][15] = '0'
        output.write('"no2": ' + result[i][15]+', ')
        if result[i][17] == '_':
            result[i][17] = '0'
        output.write('"o3": ' + result[i][17])
        output.write('}')
        if i != len(result)-1:
            output.write(',')
    output.write(']')
    output.close()
    return result


html = getHtml("http://www.pm25.in/rank")
#debug.write(html.decode('utf-8'))
temp = getData(html.decode('utf-8'))
#debug.close()