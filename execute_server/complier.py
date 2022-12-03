import os
import random
import string
import subprocess
from models import CodeFile

DIRPATH = os.getcwd()
code_path = DIRPATH + "/tmp/"
binary_path = DIRPATH + "/tmp/a.out"

class ComplieCode():
    def __init__(self,code : CodeFile):
        self.id = ''.join(random.SystemRandom().choice(string.ascii_letters + string.digits) for _ in range(10))
        self.codeFile = code
        self.code_file_path = code_path + self.id + ".c"
        self.input_file_path = code_path + self.id + "i"

        self.code_tmp_file = open(self.code_file_path,"w+")
        self.input_tmp_file = open(self.input_file_path,"w+")

        self.code_tmp_file.write(self.codeFile.code)
        self.input_tmp_file.write(self.codeFile.input_buff)
        self.code_tmp_file.close()
        self.input_tmp_file.close()
    
    def __del__(self):
        os.remove(self.code_file_path)
        os.remove(self.input_file_path)

    async def compile(self):
        try:
            if self.codeFile.lang == "c":
                result = self.cCompile()
            # elif self.codeFile['lang'] == "python":
            #     result = self.pyCompile()
            # elif self.codeFile['lang'] == "c_cpp":
            #     result = self.cppCompile()
            # elif self.codeFile['lang'] == "java":
            #     result = self.javaCompile()

        except subprocess.CalledProcessError as e: #컴파일 실패
            result = 'complie fail\n'
            result += e.output.replace(self.code_file_path,"")
            # for line in e.output.split('\n'):
            #     line.replace(self.code_file_path," ")                
            #     result += line
            #     result += '\n'
        except subprocess.TimeoutExpired as e:
            print("complie fail")
            if len(e.output) > 10000:
                result = 'Warning: over 10000 char\n'
                result += e.output.decode('utf-8')[:10000]
            else:
                result = e.output
      
        

        return result
    
    def cCompile(self):
        output = subprocess.check_output("gcc -o {0} {1}".format(code_path + self.id, self.code_file_path),shell =True,stderr=subprocess.STDOUT,universal_newlines=True)

        return subprocess.check_output("cat " + code_path + self.id + "i " + " |" + code_path + self.id, shell=True, timeout = 1,universal_newlines=True)
    
    # def cppCompile(self):
    #     output =subprocess.check_output("g++ -o {0}/test {1}".format(DIRPATH+"/template_code",file_path),shell =True,stderr=subprocess.STDOUT,universal_newlines=True)
    #     return subprocess.check_output("cat " + input_path + " |" + DIRPATH +"/template_code/test", shell=True,timeout = 1,universal_newlines=True)

    # def pyCompile(self):
    #     return subprocess.check_output("cat " + input_path + " |" + "python3 " +file_path, shell=True,timeout = 1,universal_newlines=True,stderr=subprocess.STDOUT)

    # def javaCompile(self):
    #     output =subprocess.check_output("javac " + DIRPATH +"/template_code/Main.java",shell =True,stderr=subprocess.STDOUT,universal_newlines=True)
    #     return subprocess.check_output("cat " + input_path + " |java -cp " +  DIRPATH +"/template_code " +"Main", shell=True,timeout = 1,universal_newlines=True)
    
