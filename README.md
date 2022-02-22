# safeguard-send-dashboard
Manager's view of all actions taken by Safeguard Send users.  Uses random data to simulate the views.

The <a href="https://www.sperrysoftware.com/Email-Tools/product/safeguard-send-for-office-365/">Safeguard Send add-in for Microsoft 365</a> prevents user mistakes by checking outgoing emails to make sure that the recipients are valid, attachments are correct, there are no account numbers (drivers licenses, credit cards, etc) in the email, etc.  

This dashboard is designed for managers, not end users.  With this view, managers can login to https://www.SperrySoftware365.com, and then be able to:
1)	Be able to sort on by user (then by date)
2)	See how many total users have been prompted 
3)	See a list of users who have not been prompted at all within the last 30 days (so you can tell if the add-in is not responding)
4)	See how many times the add-in has saved an inadvertent email from going out the door
5)	See your most popular rules
6)	Be able to view/edit your own rules (using the icons in the upper right corner)
7)	Be able to double click and see more information about the row (User name, email address, date, subject, to, from, cc, bcc, attachment name(s), rule, prompt text, response, and a next/previous button to easily scroll through interactions by this same user)

![image](https://user-images.githubusercontent.com/93170237/155191688-801c876b-962e-4111-8b5a-fefd57697625.png)

A demo version of this project is available at https://avidindoorsman2022.github.io/safeguard-send-dashboard/index.html.

Note that only item 1 is implemented in this demo version.

