package com.sample.api.tests.features;

import com.intuit.karate.KarateOptions;
import com.intuit.karate.Results;
import com.intuit.karate.Runner;
import com.pro.api.tests.helpers.FileUtility;
import net.masterthought.cucumber.Configuration;
import net.masterthought.cucumber.ReportBuilder;
import org.apache.commons.io.FileUtils;
import org.junit.Test;

import java.io.File;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.TimeZone;

import static org.junit.Assert.assertTrue;

@KarateOptions(tags = {"~@ignore"},
        features = {
                "src/test/java/com/sample/api/tests/features/weather/weather.feature"
        })

public class TestRunner {

    private void generateReport(String karateOutputPath) throws Exception {
        Collection<File> jsonFiles = FileUtils.listFiles(new File(karateOutputPath), new String[]{"json"}, true);
        List<String> jsonPaths = new ArrayList<String>(jsonFiles.size());
        for (File file : jsonFiles) {
            jsonPaths.add(file.getAbsolutePath());
        }
        Configuration config = new Configuration(new File("target"), "Rest-API Automation Suite");
        ReportBuilder reportBuilder = new ReportBuilder(jsonPaths, config);
        reportBuilder.generateReports();
    }

    @Test
    public void testAllFeatures() throws Exception {
        TimeZone.setDefault(TimeZone.getTimeZone("IST"));

        String karateOutputPath = "target/surefire-reports";
        Results stats = Runner.parallel(getClass(), 1, karateOutputPath);
        generateReport(karateOutputPath);
        FileUtility.constructEmailableReport("target/cucumber-html-reports/overview-features.html");
        assertTrue("There are scenario failures", stats.getFailCount() == 0);
    }

}

