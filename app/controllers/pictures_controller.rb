class PicturesController < ApplicationController
	before_filter :authenticate, :only => [:create, :destroy]
  # GET /pictures
  def index
  @user = current_user
  @pictures = @user.pictures.paginate(:page => params[:page])
  @picture = Picture.new
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @pictures }
	  format.js
    end
  end

  # GET /pictures/1
  def show
    @picture = Picture.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.js
    end
  end

  # GET /pictures/new
  def new
    @picture = Picture.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @picture }
    end
  end

  # GET /pictures/1/edit
  def edit
    @picture = Picture.find(params[:id])
  end


  def create
    @picture = current_user.pictures.build(params[:picture])      
	 respond_to do |format|
      format.html {
		if @picture.save
			redirect_to @current_user, notice: 'Picture was successfully created.' 	
		 else
			render action: "new" 
		end
	  }
      format.js
    end
  end

  # PUT /pictures/1
  def update
    @picture = Picture.find(params[:id])

    respond_to do |format|
      if @picture.update_attributes(params[:picture])
        format.html { redirect_to @picture, notice: 'Picture was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @picture.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /pictures/1
  def destroy
    @picture = Picture.find(params[:id])
    @picture.destroy

    respond_to do |format|
      format.html { redirect_to pictures_url }
      format.json { head :no_content }
    end
  end
end
