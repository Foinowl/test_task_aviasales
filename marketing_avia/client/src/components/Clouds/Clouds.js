import "./Clouds.css"


const Clouds = () => {
  const clouds = new Array(12).fill('').map((val, i) => {
    console.log(i);
    const styles = `cloud cloud--${i+1}`
    return <div className={styles}></div>
  })

  return (
		<div className="clouds">
      {clouds}
		</div>
	)
}

export default Clouds