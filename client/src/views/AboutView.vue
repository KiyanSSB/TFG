<template>
  <div className="about-container">
  <div className="gepeto">
      <img src="https://avatars.githubusercontent.com/u/49482087?v=4"/>
  </div>
  <div className="description">
    <h2>About Me</h2>
    <p>Hi! My name is Gabriel and i'm the current developer of TableFG websit, please feel free to contact me through my Email: gdld1@alu.ua.es</p>
  </div>  
  </div>
  
</template>

<style>

.about-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: 5%;
}

.gepeto{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 100%;
  border-right: 1px solid rgba(0, 0, 0, 0.253);
}

.gepeto img {
  clip-path: circle();
  border-radius: 50%;
}

.description{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  padding: 10em;
  height: 100%;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>