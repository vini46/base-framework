package com.pro.api.tests.helpers;

import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.zeroturnaround.zip.ZipUtil;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.List;
import java.util.stream.Stream;

public class FileUtility {

    private static final Logger logger = LoggerFactory.getLogger(FileUtility.class);

    public static String writeToFile(String filePath, String content) {
        content = content + "\n";
        logger.info("In Java Function - Control transfer from Karate..");
        try {
            Files.write(Paths.get(filePath), content.getBytes(StandardCharsets.UTF_8),
                    StandardOpenOption.CREATE, StandardOpenOption.APPEND);
            return "Added SR ID to Collection List";
        } catch (Exception e) {
            logger.info("Unable to write to File - " + filePath + e);
            return "Unable to Add SR ID to Collection List";
        }
    }

    public static boolean writeReport(String filePath, String content) {
        content = content + "\n";
        try {
            Files.write(Paths.get(filePath), content.getBytes(StandardCharsets.UTF_8),
                    StandardOpenOption.CREATE, StandardOpenOption.CREATE_NEW);
            return true;
        } catch (Exception e) {
            logger.info("Unable to write to File - " + filePath + e);
            return false;
        }
    }

    public static void constructEmailableReport(String filePath) throws IOException {
        StringBuilder contentBuilder = new StringBuilder();
        try (Stream<String> stream = Files.lines(Paths.get(filePath), StandardCharsets.UTF_8)) {
            stream.forEach(s -> contentBuilder.append(s).append("\n"));
        } catch (IOException e) {
            e.printStackTrace();
        }
        String htmlContent = contentBuilder.toString();
        htmlContent = htmlContent.replace("js/jquery.min.js", "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js");
        htmlContent = htmlContent.replace("js/jquery.tablesorter.min.js", "https://cdnjs.cloudflare.com/ajax/libs/jquery.tablesorter/2.31.1/js/jquery.tablesorter.min.js");
        htmlContent = htmlContent.replace("js/Chart.min.js", "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.min.js");
        htmlContent = htmlContent.replace("js/moment.min.js", "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment.min.js");
        htmlContent = htmlContent.replace("js/bootstrap.min.js", "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js");
        htmlContent = htmlContent.replace("css/bootstrap.min.css", "https://netdna.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css");
        htmlContent = htmlContent.replace("css/font-awesome.min.css", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.1/css/fontawesome.min.css");

        boolean report = writeReport("target/surefire-reports/emailReport.html", htmlContent);
        if (report == true)
            System.out.println("Emailable Report Generated");
        else
            System.out.println("Error in Generation of Email Report");
        String styleCode = "<style type=\"text/css\">body {    /* Shifts body so navigation bar does not overlap it.    Make sure to include this after the core Bootstrap CSS. */    padding-top: 60px;}h2 {    font-size: 24px;}a {    color: #0097da;}a:hover {    color: #00587f;}.header-tag-name {    color: gray;    font-style: italic;}.keyword {    font-weight: bold;}.argument {    font-weight: bold;}.indention {    padding-left: 3px;}.inner-level {    margin-top: 5px;    margin-left: 20px;    padding-bottom: 2px;    padding-left: 1px;}.element {    margin-bottom: 15px;    padding-left: 3px;}/* left line along each section */.element, .steps, .hooks-after, .hooks-before {    box-shadow: -1px 0 lightgray;    transition: box-shadow 0.3s;}.element:hover, .steps:hover, .hooks-after:hover, .hooks-before:hover {    box-shadow: -3px 0 #6ce;}.description {    font-style: italic;    background-color: beige;    white-space: pre;}.message, .output, .embedding {    background-color: #dfdfdf;    overflow: auto;}/*   same as <pre> from bootstrap library.   padding and overflow-x added.*/.embedding-content {    padding: 10px;    margin-left: 10px;    margin-right: 10px;    margin-bottom: 10px;    font-size: 13px;    overflow-x: auto;    line-height: 1.42857143;    color: #333;    word-break: break-all;    word-wrap: break-word;    background-color: #f5f5f5;    border: 1px solid #ccc;    border-radius: 4px;}.html-content {    position: relative;    /* proportion value to aspect ratio 16:9 (9 / 16 = 0.5625 or 56.25%) */    padding: 0 0 56.25%;    height: 0;    overflow: hidden;}.html-content iframe {    position: absolute;    top: 0;    left: 0;    width: 100%;    height: 100%;    border:none;}.download-button {    float: right;    margin-right: 10px;    color: #333;}/* names of those classes must be the same as name of the statuses (to lower case) in Status class  */.passed {    background-color: #92DD96;}.failed {    background-color: #F2928C;}.skipped {    background-color: #8AF;}.pending {    background-color: #F5F28F;}.undefined {    background-color: #F5B975;}.lead-duration {    float: right;    padding-right: 15px;}table.stats-table {    background-color: white;    color: black;    margin-bottom: 20px;    width: 100%;}table.stats-table th, table.stats-table td {    border: 1px solid gray;    padding: 5px;    text-align: center;}table.stats-table tr.header {    background-color: #66CCEE;}table.stats-table tfoot {    font-weight: bold;}tfoot.total, td.total, th.total {    background-color: lightgray;}table.stats-table td.duration {    text-align: right;    white-space: nowrap;}table.stats-table td.tagname {    text-align: left;}table.stats-table td.location, .location {    font-family: monospace;    text-align: left;}table.step-arguments {    margin-bottom: 5px;    margin-left: 25px;    margin-top: 3px;}table.step-arguments th, table.step-arguments td {    border: 1px solid gray;    padding: 3px;    text-align: left;}table#tablesorter thead tr:not(.dont-sort) th {    cursor: pointer;}tr:hover {    transition: background-color 0.3s;}.collapsable-control {    cursor: pointer;}.chevron:after {    content: \"\\f078\";}.collapsed .chevron:after {    content: \"\\f054\";}.footer {    font-size: smaller;    text-align: center;    margin-top: 30px;}/* Custom Bootstrap CSS overloading. */.carousel-indicators {    bottom: 0;}.carousel-indicators li {    border: 1px solid black;}.carousel-indicators .active {    background-color: black;}.carousel-control {    font-size: 40px;    padding-top: 150px;;}.carousel-control.right, .carousel-control.left {    background-image: none;    color: #eee;}pre {    margin: 10px;}</style><script type=\"text/javascript\">$(document).ready(function() {    // this will tell tablesorter to try looking for the data-value attribute    // if present, it'll sort by that instead    // otherwise, it'll sort by the text content of the table cell    $(\"#tablesorter\").tablesorter({        textAttribute: 'data-value',        // ignores the first row of the header, the 'scenario', 'steps', since        // sorting those doesn't make sense        selectorHeaders: '> thead tr:not(.dont-sort) th',        // use a stable sort        sortStable: true    });});</script>";
        writeStrToFileAtGivenLineNum(styleCode, new File("target/surefire-reports/emailReport.html"), 17);
        createZip();
    }

    public static void createZip() {
        ZipUtil.pack(new File("target/surefire-reports"), new File("target/cucumberReport.zip"));
    }

    public static void writeStrToFileAtGivenLineNum(String str, File file, int lineNum) throws IOException {
        List<String> lines = java.nio.file.Files.readAllLines(file.toPath());
        lines.add(lineNum, str);
        java.nio.file.Files.write(file.toPath(), lines);
    }

    public static void reformatReport(String filePath) throws IOException {
        StringBuilder contentBuilder = new StringBuilder();
        try (Stream<String> stream = Files.lines(Paths.get(filePath), StandardCharsets.UTF_8)) {
            stream.forEach(s -> contentBuilder.append(s).append("\n"));
        } catch (IOException e) {
            e.printStackTrace();
        }
        String htmlContent = contentBuilder.toString();
        htmlContent = htmlContent.replaceAll("images/icon_warning_sml.gif", "https://img.icons8.com/color/22/000000/close-window.png");
        htmlContent = htmlContent.replaceAll("images/icon_error_sml.gif", "https://img.icons8.com/color/22/000000/close-window.png");
        htmlContent = htmlContent.replaceAll("images/icon_success_sml.gif", "https://img.icons8.com/color/22/000000/flash-on.png");
        htmlContent = htmlContent.replaceAll("./images/logos/maven-feather.png", "https://img.icons8.com/color/44/000000/bot.png");
        htmlContent = htmlContent.replaceAll("bodyTable", "table table-striped table-bordered table-hover");
        boolean report = writeReport("target/site/emailMavenReport.html", htmlContent);
        if (report == true)
            System.out.println("Emailable Report Generated");
        else
            System.out.println("Error in Generation of Email Report");
        String styleCode = " <div>      <table style=\"width: 1700px; height: 53px;\" bgcolor=\"#0670ba\">        <tbody>        <tr>          <td style=\"width: 630px;\"><img src=\"https://ci3.googleusercontent.com/proxy/1d3pauNfPmbR458wOQPVMjmNlGGN7nMG3uodcCHUCiNSJOud9PKXJFwkh1RAx4OTQdLF1zyPXuyaty65WNUO5LFSeyF1gIoonP7_2A5h441J0rJo7cVgNALudaI=s0-d-e1-ft#https://s3-us-west-1.amazonaws.com/ad-placements/email/pro-logo-white.png\" alt=\"\" width=\"78\" height=\"45\" /> </td>        </tr>        </tbody>      </table>    </div>    <style>table {  font-family: arial, sans-serif;  border-collapse: collapse;  width: 60%;}td {  border: 1px solid #d0d0d0;  text-align: left;  padding: 8px;}th {  border: 1px solid #d0d0d0;  text-align: left;  padding: 8px;  color:white;background-color:#0670ba;}</style>";
        writeStrToFileAtGivenLineNum(styleCode, new File("target/site/emailMavenReport.html"), 13);

    }
}