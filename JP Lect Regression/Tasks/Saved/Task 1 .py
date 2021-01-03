#!/usr/bin/env python
# coding: utf-8

# # Task 1: Slide 46
# ### Simple regression model using student effort data
# ### - What mark will you get if you study for 80 hours
# ### - How many hours do you need to study to get an A?

# ## Looking at the data

# In[1]:


import numpy as np
import matplotlib.pyplot as plt

# import useful libraries
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import scipy.stats as stats
import csv
# this line plots graphs in line
get_ipython().run_line_magic('matplotlib', 'inline')


# In[2]:


data = np.array([[84,70], 
       [76, 64], 
       [90, 83], 
       [63, 45], 
       [55, 40],
       [60, 38],
       [34, 20]] )


# In[3]:


data


# In[4]:


students =plt.scatter(data[:,0],data[:,1], marker='o', color = 'b' )

plt.xlabel('Hours')
plt.ylabel('Grade')
plt.title('Scatter plot of Hours against Grade of stduents')

plt.show()


# ## Manually trying to fit a line (just to get oriented)

# In[5]:



# eqn of line : y = mx + c
# Changing these manualy till I get something I am happy with
c= -22
m =1.15

#I just want to generate a bunch of x values so that I can see the line
x =np.array([0,101])
y = m*x +c

#plotting scatter plot 
students =plt.scatter(data[:,0],data[:,1], marker='o', color = 'b' )

plt.xlabel('Hours')
plt.ylabel('Grade')
plt.title('Scatter plot of Hours against Grade of stduents')


plt.plot(x,y, 'g')

plt.show()


# ## Ok, now I want a form of metric to measure distacne from each sample to my line
# (even though I don't have my line yet, I think I need this to figure out the error, so I can minimise it) 
# Params: line points (x and y), and the line m and c)
# Returns: A numeric value, representing my error
# 

# In[6]:


def squareError(x,y, m,c):
    predictedValue = m*x +c
    err = predictedValue - y
    return err **2
    


# ## Just for the sake of trying, I am going to try fit m and c using random numbers.
# I guess I am cheating slightly by norrowing down my range with the values I found manually.

# In[7]:


iterations = 100000
maxM = 5
minM = 0

maxC = 5
minC =-40


Besterror =100000
bestWeights=[0,0]
errors = []

for i in range(iterations):
    #print(i)
    errors = []

    m = np.random.uniform(low=minM, high=maxM)
    
    c = np.random.uniform(low=minC, high=maxC)
    currentVals = [m ,c]
    for sample in data:
        errors.append(squareError(sample[0], sample[1],m,c ))
    Currenterror= sum(errors)
   

    if(Besterror > Currenterror):
        bestWeights = currentVals
        Besterror = Currenterror



print("------ Final -----")    
print ("Best error:",Besterror)

print("Best weghts:",bestWeights)


# In[ ]:





# ## Now I can try it properly with gradient decesent 

# In[ ]:





# In[ ]:





# In[8]:


xy = np.multiply(data[:,0],data[:,1])
ySquared = np.square(data[:,1])
xSquared = np.square(data[:,0])


# In[9]:


def f (m,c , data):
    X = data[:,0]
    Y = data[:,1]
    return m**2  + (2*c*m*sum(X))- (2*m*sum(xy) )- (2*c*sum(Y))+ (2*(c**2))+ sum(ySquared)


# In[ ]:





# In[10]:


#Partial differntiantios on X and Y
def df_dc(m,c,data):
    return (m*sum(data[:,0])) -sum(data[:,1]) + (len(data)*c)
def df_dm(m,c,data):
    return (m*(sum(xSquared))) + (c*sum(data[:,0])) -(sum(xy))


# In[27]:


# Building the model
m = 1
c = -20

L = 0.00001  # The learning Rate
interations = 100000 # The number of iterations to perform gradient descent
inputC =np.zeros(interations)
inputM=np.zeros(interations)

n = (len(data)) # Number of elements in X

# Performing Gradient Descent 
for i in range(interations): 

    #print (m, c)

    errors = []
    #calculate how much we want to change, ie the change from the differencation (how much we move done the slope)
    delatM = df_dm(m,c,data)  
    deltaC = df_dc(m,c,data)  
    m = m - L * delatM  # Update m
    c = c - L * deltaC  # Update c
    
    #Storing these to try plot them later
    inputM[i]= m
    inputC[i]= c
    for sample in data:
        errors.append(squareError(sample[0], sample[1],m,c ))
    Currenterror= sum(errors)/len(data)
    print(Currenterror)
    if(Currenterror<14):
        print("convergance")
        break
    
print (m, c)


# In[28]:



#using the m and c computed before, to see how it looks

#I just want to generate a bunch of x values so that I can see the line
x =np.array([0,101])
y = m*x +c

#plotting scatter plot 
students =plt.scatter(data[:,0],data[:,1], marker='o', color = 'b' )

plt.xlabel('Hours')
plt.ylabel('Grade')
plt.title('Scatter plot of Hours against Grade of stduents')


plt.plot(x,y, 'g')

plt.show()


# # if you study for 80 hours
# ie x = 80

# In[29]:


mark = m*(80)+c
print(mark)


# # To get an A , ie y= 80

# In[30]:


x = ( (80)-c )/ m
print (x)


# # Seeing R squared

# In[31]:


def rSquared(m,c , data):
    Y =data[:,1]
    X =data[:,0]
    meanY = np.mean(Y)
    predY = m*X +c
    
    numerator = sum((Y- predY)**2)
    denumerator = sum((Y- meanY)**2)
    
    return 1-(numerator/denumerator)


# In[32]:


print("R squared: ", rSquared(m,c,data))


# In[ ]:





# In[ ]:





# In[17]:


#trying to plot it, I  think I have a problem here

minimumZ =f(inputM,inputC,data)


#-------- Printing --------

N=15
x=np.linspace(0,2, N)
y=np.linspace(-25,-20, N)


X,Y = np.meshgrid(x,y)
Z = f(X , Y,data)


fig=plt.figure()
ax = fig.add_subplot(111,projection="3d")
ax.plot_wireframe(X,Y,Z)


ax.plot(inputM,inputC, minimumZ, 'ro')
plt.show


# # Scaling

# ## Attemping to scale the data to see the affects of scaling

# In[18]:


dataXScaled = (((data[:,0])-np.mean(data[:,0])) / np.std(data[:,0]))
datayScaled = (((data[:,1])-np.mean(data[:,1])) / np.std(data[:,1]))
dataScaled = [dataXScaled, datayScaled]

dataS =np.array([dataXScaled,datayScaled] )

dataS = np.transpose(dataS)
print(dataS)


# In[19]:


dataS[:,0].mean()


# In[20]:


data


# In[21]:


# Building the model
m = 1
c = -10

L = 0.00001  # The learning Rate
interations = 1000000 # The number of iterations to perform gradient descent
inputC =np.zeros(interations)
inputM=np.zeros(interations)

n = (len(dataS)) # Number of elements in X

# Performing Gradient Descent 
for i in range(interations): 

    #print (m, c)

    
    #calculate how much we want to change, ie the change from the differencation (how much we move done the slope)
    delatM = df_dm(m,c,dataS)  
    deltaC = df_dc(m,c,dataS)  
    m = m - L * delatM  # Update m
    c = c - L * deltaC  # Update c
    #Storing these to try plot them later
    inputM[i]= m
    inputC[i]= c
    
print (m, c)


# In[22]:



#using the m and c computed before, to see how it looks
#m=0
#c=0
#I just want to generate a bunch of x values so that I can see the line
x =np.array([-5,5])
y = m*x +c

#plotting scatter plot 
students =plt.scatter(dataS[:,0],dataS[:,1], marker='o', color = 'b' )

plt.xlabel('Hours')
plt.ylabel('Grade')
plt.title('Scatter plot of Hours against Grade of stduents')


plt.plot(x,y, 'g')

plt.show()


# In[23]:


print("R squared: ", rSquared(m,c,dataS))


# In[ ]:





# In[ ]:





# In[ ]:




