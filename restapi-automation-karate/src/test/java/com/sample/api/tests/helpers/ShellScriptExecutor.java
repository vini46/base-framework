package com.pro.api.tests.helpers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class ShellScriptExecutor {

    public static String runScript(String filepath) {
        Process p;
        String line="";
        String scriptOutput="";
        try {
            String[] cmd = {"sh", filepath};
            p = Runtime.getRuntime().exec(cmd);
            p.waitFor();
            BufferedReader reader = new BufferedReader(new InputStreamReader(
                    p.getInputStream()));
            while ((line = reader.readLine()) != null) {
                scriptOutput+=line;
            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return scriptOutput;
    }
}
