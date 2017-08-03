import smtplib
from flask import session
from email.MIMEMultipart import MIMEMultipart
from email.MIMEText import MIMEText
from email.MIMEBase import MIMEBase
from email import encoders
from database import db
import os
def test(tt):
	print tt
	print "hello"

def sen_email(filepath):
	try:
		fromaddr = "aayushidangol1506@gmail.com"
		name = os.path.basename(filepath)
		final_name = session['ClientId']
		client_Info=db.clientRecord.find_one({"clientId":final_name})

		if client_Info!=None:
			if len(client_Info['email'])>1:
				toaddr = str(client_Info['email'])
				msg= MIMEMultipart()
				msg['From']=fromaddr
				msg['To']=toaddr
				msg['Subject'] = "Maintenance Report"

				body = " Attached below is the maintenance report"

				msg.attach(MIMEText(body, 'plain'))
				filename = final_name
				path = filepath
				attachment = open(path, 'rb')
				 
				part = MIMEBase('application', 'octet-stream')
				part.set_payload((attachment).read())
				encoders.encode_base64(part)
				part.add_header('Content-Disposition', "attachment; filename= %s" % "yyl.pdf")
				 
				msg.attach(part)
				 
				server = smtplib.SMTP('smtp.gmail.com', 587)
				server.starttls()
				server.login(fromaddr, "")
				text = msg.as_string()
				try:

					server.sendmail(fromaddr, toaddr, text)
				except:
					print "email sending error"
					return 0
				server.quit()
				return 1
	except Exception as e:
		print "error= ",e
		return 0
				
				
