#!/usr/bin/env python
# coding: utf-8

# # Task 3: Slide 69
# 

# ## 

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


# In[41]:


# 1
x = np.linspace(-2,2,100)

y = (4*(x**4))-(3*(x**2))+ (2*x) -1

plt.plot(x,y)
plt.grid(color='b', linestyle='-', linewidth=0.5)


# In[42]:


#Gradeint = dy/dx = 2x-4
b =0
def dy_dx ( b):
    return (16*(b**3))-(6*(b))+2


# In[91]:


# 3 and 4
a=0.001
Xnew =2
N=900000
xx =np.zeros(N)
yy =np.zeros(N)

for i in range(N):
    
    
    Xnew= Xnew - a*dy_dx(Xnew)
    
    xx[i]= Xnew
    
    yy[i] =(4*(Xnew**4))-(3*(Xnew**2))+ (2*Xnew) -1

    
    #print(Xnew)
    if(abs(dy_dx(Xnew))<0.000001):
        print("Conv")
        print(i)
        break

    
print("Final Min X :",Xnew)
    
plt.plot(x, y, 'b',xx, yy ,'ro')
plt.grid(color='b', linestyle='-', linewidth=0.05)
    


# In[ ]:





# In[96]:


# 3 and 4
a=0.001
Xnew =-2.5
N=400
xx =np.zeros(N)
yy =np.zeros(N)

for i in range(N):
        
    
    Xnew= Xnew - a*dy_dx(Xnew)
    
    xx[i]= Xnew
    
    yy[i] =(4*(Xnew**4))-(3*(Xnew**2))+ (2*Xnew) -1
       
    if(abs(dy_dx(Xnew))<0.000001):
        print("Conv")
        print(i)
        break

    

    
print("Final Min X :",Xnew)
    
plt.plot(x, y, 'b',xx, yy ,'ro')
plt.grid(color='b', linestyle='-', linewidth=0.05)


# In[ ]:





# Params for gradent decent
# - just the x value, as long as you have the original function and it's differnencation

# Iterations required for convergance
# - That depends on your learning rate, and also which side you start from

# In[ ]:





# In[ ]:





# In[ ]:




